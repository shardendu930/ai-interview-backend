import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import api from "../services/api";

const Resume = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [projects, setProjects] = useState("");
  const [certifications, setCertifications] = useState("");

  const [resumes, setResumes] = useState([]);

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
        title,
        summary,
        skills: skills
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        education: education
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        experience: experience
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        projects: projects
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        certifications: certifications
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      });

      toast.success("Resume created successfully");

      setTitle("");
      setSummary("");
      setSkills("");
      setEducation("");
      setExperience("");
      setProjects("");
      setCertifications("");

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

        <h1 className="text-3xl font-bold mb-8">
          Resume Manager
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md space-y-4"
        >
          <input
            type="text"
            placeholder="Resume Title"
            className="w-full border p-3 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Summary"
            className="w-full border p-3 rounded"
            rows="3"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />

          <input
            type="text"
            placeholder="Skills (comma separated)"
            className="w-full border p-3 rounded"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <input
            type="text"
            placeholder="Education (comma separated)"
            className="w-full border p-3 rounded"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          />

          <input
            type="text"
            placeholder="Experience (comma separated)"
            className="w-full border p-3 rounded"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />

          <input
            type="text"
            placeholder="Projects (comma separated)"
            className="w-full border p-3 rounded"
            value={projects}
            onChange={(e) => setProjects(e.target.value)}
          />

          <input
            type="text"
            placeholder="Certifications (comma separated)"
            className="w-full border p-3 rounded"
            value={certifications}
            onChange={(e) => setCertifications(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
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