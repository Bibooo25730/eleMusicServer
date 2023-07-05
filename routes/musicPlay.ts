const express = require("express");
const router = express.Router();
const  validateToken = require("../middleware/validateTokenHandle")
const {
     createContact,
     createPut,
     createCreate,
     createDelete,
     createGet
} = require("../controllers/Controlles")
router.use(validateToken)
router.route("/").get(createContact)
router.route("/").post(createCreate)
router.route("/:id").get(createGet).put(createPut).delete(createDelete)
module.exports = router;