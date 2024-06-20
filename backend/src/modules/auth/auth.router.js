const express = require("express");
const authController = require("./auth.controller");
const { isAuth } = require("../../middlewares/auth");
const router = express.Router();

router.post("/signin", authController.signin);
router.post("/admin", authController.addAdmin);
router.patch("/user", isAuth, authController.editUser);
module.exports = router;
