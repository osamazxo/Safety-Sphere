const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

router.post("/signin", authController.signin);
router.post("/admin", authController.addAdmin);
module.exports = router;
