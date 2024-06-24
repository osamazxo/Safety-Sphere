const express = require("express");
const readingController = require("./readings.controller");
const { validation } = require("../../middlewares/validation");
const { addReadingSchema } = require("./readings.validation");
const router = express.Router();

router.post("/", validation(addReadingSchema), readingController.addReading);

module.exports = router;
