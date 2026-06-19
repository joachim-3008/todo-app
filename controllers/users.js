const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { PAGE_URL } = require("../config");

usersRouter.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ error: "El correo ya está registrado" });
  }

  //encriptar la contraseña

  const saltRounds = 10;

  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    name,
    email,
    passwordHash,
  });

  const savedUser = await newUser.save();
  const token = jwt.sign(
    { id: savedUser._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" },
  );

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //sends mensagge
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to: savedUser.email, // list of recipients
      subject: "Verificación de correo", // subject line
      html: `<a href="${PAGE_URL}/verify/${savedUser.id}/${token}">Verificar Correo</a>`, // HTML body
    });

    return res.status(201).json("Usuario creado verifica tu correo");

    console.log("Message sent: %s", info.messageId);
    // Preview URL is only available when using an Ethereal test account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
});

usersRouter.patch("/:id/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const id = decodedToken.id;
    await User.findByIdAndUpdate(id, { verified: true });
    return res.status(200).json("Correo verificado correctamente");
  } catch (error) {

    const id = req.params.id;
    const { email } = await User.findById(id);

    const token = jwt.sign(
      { id: id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" },
    );

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //sends mensagge

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to: email, // list of recipients
      subject: "Verificación de correo", // subject line
      html: `<a href="${PAGE_URL}/verify/${id}/${token}">Verificar Correo</a>`, // HTML body
    });

    return res.status(400).json({ error: "Token inválido o expirado. Se ha enviado un nuevo correo de verificación." });
  }
});

module.exports = usersRouter;
