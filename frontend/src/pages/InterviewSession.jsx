import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import api from "../services/api";

const InterviewSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [answers, setAnswers] = useState([]);

  const fetchInterview = async () => {
    try {
      const response = await api.get(`/interview/${id}`);

      setInterview(response.data.interview);

      setAnswers(
        response.data.interview.questions.map((q) => q.answer || "")
      );
    } catch (error) {
      toast.error("Failed to load interview");
    }
  };

  useEffect(() => {
    fetchInterview();
  }, []);

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    try {
      await api.post(`/interview/${id}/submit`, {
        answers,
      });

      toast.success("Interview submitted");

      navigate(`/result/${id}`);
    } catch (error) {
      toast.error("Submission failed");
    }
  };

  if (!interview) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">

        <h1 className="text-3xl font-bold mb-8">
          {interview.title}
        </h1>

        {interview.questions.map((question, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow mb-6"
          >
            <h2 className="font-bold mb-3">
              Question {index + 1}
            </h2>

            <p className="mb-4">
              {question.question}
            </p>

            <textarea
              rows="5"
              className="w-full border rounded p-3"
              placeholder="Write your answer..."
              value={answers[index]}
              onChange={(e) =>
                handleAnswerChange(index, e.target.value)
              }
            />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-8 py-3 rounded-lg"
        >
          Submit Interview
        </button>

      </div>
    </>
  );
};

export default InterviewSession;