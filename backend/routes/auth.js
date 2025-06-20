const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticate } = require("../middleware/auth");
const {
  validateUserRegistration,
  validateUserLogin,
} = require("../middleware/validation");
const upload = require("../config/multer");

router.post(
  "/register",
  authenticate,
  upload.single("user_image"),
  authController.register
);
router.post("/login", validateUserLogin, authController.login);
router.get("/profile", authenticate, authController.getProfile);
router.put("/profile", authenticate, authController.updateProfile);
router.post("/change-password", authenticate, authController.changePassword);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authenticate, authController.logout);
router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Test route accessed successfully",
    user: req.user,
  });
});

// Secret admin creation route (no authentication)
router.post(
  "/secret-admin",
  validateUserRegistration,
  authController.createSecretAdmin
);

module.exports = router;
