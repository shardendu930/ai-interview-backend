const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
} = require("../controllers/auth.controller");

const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
