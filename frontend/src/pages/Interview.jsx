import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import api from "../services/api";

const Interview = () => {
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);

  const fetchInterviews = async () => {
    try {
      const response = await api.get("/interview");

      setInterviews(response.data.interviews);
    } catch (error) {
      toast.error("Failed to fetch interviews");
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/interview", {
        title,
        role,
        difficulty,
        numberOfQuestions,
      });

      toast.success("Interview created successfully");

      setTitle("");
      setRole("");
      setDifficulty("Medium");
      setNumberOfQuestions(10);

      fetchInterviews();
    } catch (error) {
      toast.error("Failed to create interview");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this interview?")) return;

    try {
      await api.delete(`/interview/${id}`);

      toast.success("Interview deleted");

      fetchInterviews();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">

        <h1 className="text-3xl font-bold mb-8">
          Interview Manager
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow space-y-4"
        >
          <input
            className="w-full border p-3 rounded"
            placeholder="Interview Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            className="w-full border p-3 rounded"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />

          <select
            className="w-full border p-3 rounded"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <input
            type="number"
            className="w-full border p-3 rounded"
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
          />

          <button
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Create Interview
          </button>
        </form>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-5">
            Your Interviews
          </h2>

          {interviews.length === 0 ? (
            <p>No interviews found.</p>
          ) : (
            <div className="grid gap-5">
              {interviews.map((interview) => (
                <div
                  key={interview._id}
                  className="bg-white p-5 rounded-xl shadow"
                >
                  <h3 className="text-xl font-bold">
                    {interview.title}
                  </h3>

                  <p>
                    <strong>Role:</strong> {interview.role}
                  </p>

                  <p>
                    <strong>Difficulty:</strong>{" "}
                    {interview.difficulty}
                  </p>

                  <p>
                    <strong>Questions:</strong>{" "}
                    {interview.numberOfQuestions}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {interview.status}
                  </p>

                  <div className="flex gap-3 mt-5">

                   <button
                     onClick={() => navigate(`/interview/${interview._id}`)}
                     className="bg-green-600 text-white px-5 py-2 rounded"
                   >
                     Start
                   </button>

                    <button
                      onClick={() =>
                        handleDelete(interview._id)
                      }
                      className="bg-red-600 text-white px-5 py-2 rounded"
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

export default Interview;