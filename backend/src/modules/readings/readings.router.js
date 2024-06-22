const express = require("express");
const readingController = require("./readings.controller");
const { isAuth } = require("../../middlewares/auth");
const { validation } = require("../../middlewares/validation");
const { addReadingSchema } = require("./readings.validation");
const router = express.Router();

router.post("/", validation(addReadingSchema), readingController.addReading);
router.get("/", isAuth, readingController.getReadings);

module.exports = router;
