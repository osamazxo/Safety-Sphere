const express = require("express");
const {
  getUserDashboard,
  getAdminDashboard,
} = require("./dashboard.controller");
const { isAuth, isAdmin } = require("../../middlewares/auth");
const router = express.Router();

router.get("/user-dashboard", isAuth, getUserDashboard);
router.get("/admin-dashboard", isAuth, isAdmin, getAdminDashboard);

module.exports = router;
