const express = require("express");
import {Response,Request} from "express";

const router = express.Router();
const {
    createLogin,
    createRegister,
    createCurrent,
} = require("../controllers/userControlles")



router.post("/current",createCurrent)

router.route("/register").post(createRegister)
router.route("/login").post(createLogin)
router.route("/current").post(createCurrent)

module.exports = router