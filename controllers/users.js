const usersRouter = require("express").Router();

usersRouter.post("/", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

});


module.exports = usersRouter;
