const express = require("express");
const router = express.Router();
const {
     createContact,
     createPut,
     createUpdate,
     createDelete,
     createGet
} = require("../controllers/Controlles")
router.route("/").get(createContact)
router.route("/").post(createUpdate)
router.route("/:id").get(createGet).put(createPut).delete(createDelete)
module.exports = router;