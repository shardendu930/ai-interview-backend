const express = require("express");

const router = express.Router();

const {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
} = require("../controllers/resume.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, createResume);
router.get("/", authMiddleware, getResumes);
router.get("/:id", authMiddleware, getResumeById);
router.put("/:id", authMiddleware, updateResume);
router.delete("/:id", authMiddleware, deleteResume);

module.exports = router;
