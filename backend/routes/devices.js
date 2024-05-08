const express = require("express");
const deviceController = require("../controllers/devices");

const router = express.Router();

router.post("/", deviceController.addDevice);

module.exports = router;
