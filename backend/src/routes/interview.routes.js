const express = require("express");

const router = express.Router();

const {
  createInterview,
  getInterviews,
  getInterviewById,
  submitInterview,
  updateInterview,
  deleteInterview,
  getInterviewResult,
} = require("../controllers/interview.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, createInterview);
router.get("/", authMiddleware, getInterviews);
router.get("/:id", authMiddleware, getInterviewById);
router.post("/:id/submit", authMiddleware, submitInterview);
router.put("/:id", authMiddleware, updateInterview);
router.delete("/:id", authMiddleware, deleteInterview);
router.get("/:id/result", authMiddleware, getInterviewResult);

module.exports = router;
