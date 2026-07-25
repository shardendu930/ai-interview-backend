import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import api from "../services/api";

const Result = () => {
  const { id } = useParams();

  const [interview, setInterview] = useState(null);

  const fetchResult = async () => {
    try {
      const response = await api.get(`/interview/${id}/result`);

      setInterview(response.data.interview);
    } catch (error) {
      toast.error("Failed to fetch result");
    }
  };

  useEffect(() => {
    fetchResult();
  }, []);

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

        <h1 className="text-4xl font-bold mb-8">
          Interview Result
        </h1>

        <div className="bg-white p-6 rounded-xl shadow mb-8">

          <h2 className="text-2xl font-bold">
            {interview.title}
          </h2>

          <p className="mt-3">
            <strong>Role:</strong> {interview.role}
          </p>

          <p>
            <strong>Status:</strong> {interview.status}
          </p>

          <p className="text-2xl font-bold text-green-600 mt-5">
            Overall Score : {interview.overallScore.toFixed(2)}
          </p>

        </div>

        {interview.questions.map((question, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow mb-6"
          >

            <h2 className="font-bold text-lg">
              Question {index + 1}
            </h2>

            <p className="mt-2">
              {question.question}
            </p>

            <div className="mt-4">
              <strong>Your Answer:</strong>

              <p>{question.answer}</p>
            </div>

            <div className="mt-4">
              <strong>AI Feedback:</strong>

              <p>{question.feedback}</p>
            </div>

            <div className="mt-4 text-blue-600 font-bold">
              Score : {question.score}
            </div>

          </div>
        ))}

      </div>
    </>
  );
};

export default Result;