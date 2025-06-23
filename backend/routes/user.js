const express = require("express"); // if we used express in our main app.js entry point file then use app
const router = express.Router(); // we are using in other file then use router for express
const { signUp, login } = require("../controllers/user.controller");

//Sigup Route

router.post("/register", signUp);

router.post("/login", login);

module.exports = router;
