const allRouter = require("express").Router();
const register = require("./register");
const login = require("./login");

//REGISTRATION routing
allRouter.post("/register", register);
//LOGIN routing
allRouter.post("/login", login);

module.exports = allRouter;
