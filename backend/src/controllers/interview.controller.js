const { evaluateInterviewAnswers } = require("../services/ai.service");
const Interview = require("../models/Interview");

const { generateInterviewQuestions } = require("../services/ai.service");

async function createInterview(req, res) {
  try {
    const { title, role, difficulty, numberOfQuestions } = req.body;

    const questions = await generateInterviewQuestions(
      role,
      difficulty,
      numberOfQuestions,
    );

    const interview = await Interview.create({
      title,
      role,
      difficulty,
      numberOfQuestions,
      questions,
      user: req.user._id,
    });

    return res.status(201).json({
      message: "Interview created successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getInterviews(req, res) {
  try {
    const interviews = await Interview.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      message: "Interviews fetched successfully",
      interviews,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getInterviewById(req, res) {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    return res.status(200).json({
      message: "Interview fetched successfully",
      interview,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function submitInterview(req, res) {
  try {
    const { id } = req.params;
    const { answers } = req.body;

    const interview = await Interview.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    // Validate answers
    if (!answers || answers.length !== interview.questions.length) {
      return res.status(400).json({
        message: "Please answer all interview questions.",
      });
    }

    // Save user's answers
    for (let i = 0; i < answers.length; i++) {
      interview.questions[i].answer = answers[i];
    }

    // Evaluate answers using AI
    const evaluation = await evaluateInterviewAnswers(interview.questions);

    let totalScore = 0;

    // Save AI scores and feedback
    for (let i = 0; i < evaluation.length; i++) {
      interview.questions[i].score = evaluation[i].score;
      interview.questions[i].feedback = evaluation[i].feedback;

      totalScore += evaluation[i].score;
    }

    // Calculate overall score
    interview.overallScore = totalScore / evaluation.length;

    // Update interview status
    interview.status = "Completed";

    // Save changes
    await interview.save();

    return res.status(200).json({
      success: true,
      message: "Interview submitted successfully.",
      interview,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

const getInterviewResult = async (req, res) => {
  try {
    const { id } = req.params;

    const interview = await Interview.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    if (interview.status !== "Completed") {
      return res.status(400).json({
        success: false,
        message: "Interview is not completed yet.",
      });
    }

    return res.status(200).json({
      success: true,
      interview,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
async function updateInterview(req, res) {
  try {
    const { title, role, difficulty, numberOfQuestions, status } = req.body;

    const interview = await Interview.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      {
        title,
        role,
        difficulty,
        numberOfQuestions,
        status,
      },
      {
        new: true,
      },
    );

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    return res.status(200).json({
      message: "Interview updated successfully",
      interview,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function deleteInterview(req, res) {
  try {
    const interview = await Interview.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    return res.status(200).json({
      message: "Interview deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  createInterview,
  getInterviews,
  getInterviewById,
  submitInterview,
  getInterviewResult,
  updateInterview,
  deleteInterview,
};
