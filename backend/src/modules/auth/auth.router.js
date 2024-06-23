const express = require("express");
const authController = require("./auth.controller");
const { isAuth, isAdmin } = require("../../middlewares/auth");
const { validation } = require("../../middlewares/validation");
const {
  signinSchema,
  addAdminSchema,
  editUserSchema,
  deleteAdminSchema,
} = require("./auth.validation");
const router = express.Router();

router.post("/signin", validation(signinSchema), authController.signin);
router.get("/user", isAuth, authController.getUser);
router.patch(
  "/user",
  isAuth,
  validation(editUserSchema),
  authController.editUser
);
router.get("/admin", isAuth, isAdmin, authController.getAdmins);
router.post(
  "/admin",
  isAuth,
  isAdmin,
  validation(addAdminSchema),
  authController.addAdmin
);
router.delete(
  "/admin",
  isAuth,
  isAdmin,
  validation(deleteAdminSchema),
  authController.deleteAdmin
);

module.exports = router;
