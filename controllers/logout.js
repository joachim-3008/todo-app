const logoutRouter = require("express").Router();
const { response } = require("express");

logoutRouter.post("/", async (req, res) => {
  const cookie = req.cookie;
  
  if(!cookie?.accessToken){
    return response.sendStatus(401);

  }

  response.clearCookie('accesToken', {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  });

  return response.sendStatus(204);

});

module.exports = logoutRouter;