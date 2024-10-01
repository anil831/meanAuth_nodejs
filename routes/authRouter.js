const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");


router.post("/login",authController.login);
router.get("/refresh",authController.refreshAccessToken);

//access token is required to execute following api's
router.get("/logout", authController.logout);
router.get("/check-auth", authMiddleware,authController.checkAuth);

module.exports = router;