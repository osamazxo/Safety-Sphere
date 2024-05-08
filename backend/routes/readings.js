const express = require("express");
const readingController = require("../controllers/readings");

const router = express.Router();

router.post("/", readingController.addReading);

module.exports = router;
