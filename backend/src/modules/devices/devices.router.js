const express = require("express");
const deviceController = require("./devices.controller");
const { isAuth, isAdmin } = require("../../middlewares/auth");
const router = express.Router();

router.get("/", isAuth, isAdmin, deviceController.getDevices);
router.get("/:deviceId", isAuth, isAdmin, deviceController.getDevice);
router.post("/", isAuth, isAdmin, deviceController.addDevice);
router.patch("/:deviceId", isAuth, isAdmin, deviceController.editDevice);
router.delete("/:deviceId", isAuth, isAdmin, deviceController.deleteDevice);

module.exports = router;
