const express = require("express");
import {Response,Request} from "express";
const  validateToken = require("../middleware/validateTokenHandle")
const router = express.Router();
const {
    createLogin,
    createRegister,
    createCurrent,
} = require("../controllers/userControlles")




router.route("/register").post(createRegister)
router.route("/login").post(createLogin)
router.route("/current").get(validateToken,createCurrent)

module.exports = router