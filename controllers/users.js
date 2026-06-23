const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
const { PAGE_URL } = require("../config");

// 1. IMPORTAR TU VALIDADOR DESDE LA CARPETA UTILS
const { validateEmail } = require("../utils/emailValidator");

// --- ENDPOINT PARA REGISTRAR USUARIOS ---
usersRouter.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ error: "El correo ya está registrado" });
  }

  // Variable de control para el estado de verificación
  let isVerified = false;

  // 2. FILTRAR EL CORREO CON ABSTRACT API ANTES DE CREAR EL USUARIO
  try {
    const emailCheck = await validateEmail(email);
    
    if (!emailCheck.valid) {
      // Si el correo es falso, inválido o temporal, frenamos el registro aquí
      return res.status(400).json({ error: emailCheck.error });
    }

    // SI LA API SEÑALA QUE EL CORREO ES CORRECTO Y VALIDO:
    isVerified = true;

  } catch (error) {
    // Si la API de Abstract llega a fallar (caída o falta de créditos), 
    // dejamos pasar al usuario con verified en false para no romper la experiencia de tu app.
    console.error("Bypass de Abstract API por error:", error.message);
    isVerified = false;
  }

  // Encriptar la contraseña (Tu código original)
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    name,
    email,
    passwordHash,
    verified: isVerified, // <-- Se guarda automáticamente como true o false basado en la API
  });

  const savedUser = await newUser.save();

  if (savedUser.verified) {
    return res.status(201).json({ message: "Usuario creado y verificado exitosamente" });
  }
  // --- RESPALDO: SI LA API FALLÓ, SE ENVÍA EL CORREO DE VERIFICACIÓN TRADICIONAL ---
  // const token = jwt.sign(
  //   { id: savedUser._id },
  //   process.env.ACCESS_TOKEN_SECRET,
  //   { expiresIn: "1h" },
  // );

  // const transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 465,
  //   secure: true, // use TLS
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASS,
  //   },
  // });

  // try {
  //   const info = await transporter.sendMail({
  //     from: process.env.EMAIL_USER, 
  //     to: savedUser.email, 
  //     subject: "Verificación de correo", 
  //     html: `<a href="${PAGE_URL}/verify/${savedUser.id}/${token}">Verificar Correo</a>`, 
  //   });

  //   console.log("Message sent: %s", info.messageId);
  //   return res.status(201).json("Usuario creado verifica tu correo");
  // } catch (err) {
  //   console.error("Error while sending mail:", err);
  //   return res.status(201).json("Usuario creado, pero hubo un problema al enviar el correo de verificación.");
  // }
});

// --- ENDPOINT PARA CONFIRMAR EL CORREO CLICKEADO (Tu código original intacto) ---
// usersRouter.patch("/:id/:token", async (req, res) => {
//   try {
//     const token = req.params.token;
//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     const id = decodedToken.id;
//     await User.findByIdAndUpdate(id, { verified: true });
//     return res.status(200).json("Correo verificado correctamente");
//   } catch (error) {
//     const id = req.params.id;
//     const { email } = await User.findById(id);

//     const token = jwt.sign(
//       { id: id },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: "1h" },
//     );

//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true, 
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const info = await transporter.sendMail({
//       from: process.env.EMAIL_USER, 
//       to: email, 
//       subject: "Verificación de correo", 
//       html: `<a href="${PAGE_URL}/verify/${id}/${token}">Verificar Correo</a>`, 
//     });

//     return res.status(400).json({ error: "Token inválido o expirado. Se ha enviado un nuevo correo de verificación." });
//   }
// });

module.exports = usersRouter;