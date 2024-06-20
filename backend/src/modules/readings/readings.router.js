const express = require("express");
const readingController = require("./readings.controller");
const { isAuth } = require("../../middlewares/auth");

const router = express.Router();

router.post("/", readingController.addReading);
router.get("/", isAuth, readingController.getReadings);

module.exports = router;
