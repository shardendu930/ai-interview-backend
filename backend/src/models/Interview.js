const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },

    numberOfQuestions: {
      type: Number,
      default: 10,
    },

    status: {
      type: String,
      enum: ["Created", "Started", "Completed"],
      default: "Created",
    },

    questions: [
      {
        question: {
          type: String,
          required: true,
        },

        answer: {
          type: String,
          default: "",
        },

        feedback: {
          type: String,
          default: "",
        },

        score: {
          type: Number,
          default: 0,
        },
      },
    ],

    overallScore: {
      type: Number,
      default: 0,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
