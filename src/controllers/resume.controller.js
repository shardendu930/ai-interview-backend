const Resume = require("../models/Resume");

async function createResume(req, res) {
  try {
    const {
      title,
      summary,
      skills,
      education,
      experience,
      projects,
      certifications,
    } = req.body;

    const resume = await Resume.create({
      title,
      summary,
      skills,
      education,
      experience,
      projects,
      certifications,
      user: req.user._id,
    });

    return res.status(201).json({
      message: "Resume created successfully",
      resume,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getResumes(req, res) {
  try {
    const resumes = await Resume.find({
      user: req.user._id,
    });

    return res.status(200).json({
      message: "Resumes fetched successfully",
      resumes,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getResumeById(req, res) {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      message: "Resume fetched successfully",
      resume,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function updateResume(req, res) {
  try {
    const {
      title,
      summary,
      skills,
      education,
      experience,
      projects,
      certifications,
    } = req.body;
    const resume = await Resume.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      {
        title,
        summary,
        skills,
        education,
        experience,
        projects,
        certifications,
      },
      {
        new: true,
      },
    );

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      message: "Resume updated successfully",
      resume,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function deleteResume(req, res) {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
module.exports = {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
};
