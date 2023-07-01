import {Response} from "express";

const express = require("express");
const router = express.Router();
const {
     createContact,
     createPut,
     createUpdate,
     createDelete
} = require("../controllers/Controlles")
router.route("/").get(createContact)
router.route("/:id").post(createUpdate).put(createPut).delete(createDelete)
module.exports = router;