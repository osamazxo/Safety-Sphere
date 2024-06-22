const express = require("express");
const { isAuth } = require("../../middlewares/auth");
const { getAnalytics } = require("./analytics.controllers");
const router = express.Router();

router.get("/analytics", isAuth, getAnalytics);

module.exports = router;
