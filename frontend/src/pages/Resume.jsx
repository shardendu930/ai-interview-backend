import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import api from "../services/api";

const Resume = () => {
  const [formData, setFormData] = useState({
    title: "",
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    summary: "",

    skills: [],
    education: [],
    experience: [],
    projects: [],
    certifications: [],
  });

  const [skillInput, setSkillInput] = useState("");
  const [educationInput, setEducationInput] = useState("");
  const [experienceInput, setExperienceInput] = useState("");
  const [projectInput, setProjectInput] = useState("");
  const [certificationInput, setCertificationInput] = useState("");

  const [resumes, setResumes] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchResumes = async () => {
    try {
      const response = await api.get("/resume");
      setResumes(response.data.resumes);
    } catch (error) {
      toast.error("Failed to fetch resumes");
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/resume", {
        title: formData.title,
        summary: formData.summary,

        skills: skillInput
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        education: educationInput
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        experience: experienceInput
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        projects: projectInput
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        certifications: certificationInput
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      });

      toast.success("Resume created successfully");

      setFormData({
        title: "",
        fullName: "",
        email: "",
        phone: "",
        linkedin: "",
        github: "",
        summary: "",

        skills: [],
        education: [],
        experience: [],
        projects: [],
        certifications: [],
      });

      setSkillInput("");
      setEducationInput("");
      setExperienceInput("");
      setProjectInput("");
      setCertificationInput("");

      fetchResumes();
    } catch (error) {
      toast.error("Failed to create resume");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/resume/${id}`);

      toast.success("Resume deleted successfully");

      fetchResumes();
    } catch (error) {
      toast.error("Failed to delete resume");
    }
  };
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">

        <div className="mb-10">
          <h1 className="text-4xl font-bold">
             Resume Builder
          </h1>

          <p className="text-gray-500 mt-2">
              Build an ATS-friendly resume for AI interview analysis.
          </p>
        </div>

        <form
  onSubmit={handleSubmit}
  className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
>
  <input
    type="text"
    name="title"
    placeholder="Resume Title"
    className="w-full border p-3 rounded-lg"
    value={formData.title}
    onChange={handleChange}
    required
  />

  <textarea
    name="summary"
    placeholder="Professional Summary"
    className="w-full border p-3 rounded-lg"
    rows="4"
    value={formData.summary}
    onChange={handleChange}
  />

  <input
    type="text"
    placeholder="Skills (comma separated)"
    className="w-full border p-3 rounded-lg"
    value={skillInput}
    onChange={(e) => setSkillInput(e.target.value)}
  />

  <input
    type="text"
    placeholder="Education (comma separated)"
    className="w-full border p-3 rounded-lg"
    value={educationInput}
    onChange={(e) => setEducationInput(e.target.value)}
  />

  <input
    type="text"
    placeholder="Experience (comma separated)"
    className="w-full border p-3 rounded-lg"
    value={experienceInput}
    onChange={(e) => setExperienceInput(e.target.value)}
  />

  <input
    type="text"
    placeholder="Projects (comma separated)"
    className="w-full border p-3 rounded-lg"
    value={projectInput}
    onChange={(e) => setProjectInput(e.target.value)}
  />

  <input
    type="text"
    placeholder="Certifications (comma separated)"
    className="w-full border p-3 rounded-lg"
    value={certificationInput}
    onChange={(e) => setCertificationInput(e.target.value)}
  />

  <button
    type="submit"
    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
  >
    Create Resume
  </button>
</form>

        <div className="mt-10">
  <h2 className="text-2xl font-bold mb-5">Your Resumes</h2>

  {resumes.length === 0 ? (
    <p className="text-gray-500">No resumes found.</p>
  ) : (
    <div className="grid gap-5">
      {resumes.map((resume) => (
        <div
          key={resume._id}
          className="bg-white p-5 rounded-xl shadow"
        >
          <h3 className="text-xl font-bold">
            {resume.title}
          </h3>

          <p className="mt-2 text-gray-600">
            {resume.summary}
          </p>

          <div className="mt-3">
            <strong>Skills:</strong>{" "}
            {resume.skills.join(", ")}
          </div>

          <div className="mt-2">
            <strong>Education:</strong>{" "}
            {resume.education.join(", ")}
          </div>

          <div className="mt-2">
            <strong>Experience:</strong>{" "}
            {resume.experience.join(", ")}
          </div>

          <div className="mt-2">
            <strong>Projects:</strong>{" "}
            {resume.projects.join(", ")}
          </div>

          <div className="mt-2">
            <strong>Certifications:</strong>{" "}
            {resume.certifications.join(", ")}
          </div>

          <div className="flex gap-3 mt-5">
            <button
              className="bg-yellow-500 text-white px-5 py-2 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(resume._id)}
              className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
      </div>
    </>
  );
};

export default Resume;