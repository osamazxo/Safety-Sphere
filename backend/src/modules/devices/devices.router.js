const express = require("express");
const deviceController = require("./devices.controller");

const router = express.Router();

router.post("/", deviceController.addDevice);

module.exports = router;
