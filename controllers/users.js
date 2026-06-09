const usersRouter = require("express").Router();

usersRouter.post("/", (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
});

module.exports = usersRouter;
