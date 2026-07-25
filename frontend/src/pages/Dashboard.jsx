import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";

import api from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();

  const [resumeCount, setResumeCount] = useState(0);
  const [interviewCount, setInterviewCount] = useState(0);

  const [recentResumes, setRecentResumes] = useState([]);
  const [recentInterviews, setRecentInterviews] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const resumeResponse = await api.get("/resume");
      const interviewResponse = await api.get("/interview");

      setResumeCount(resumeResponse.data.resumes.length);
      setInterviewCount(interviewResponse.data.interviews.length);

      setRecentResumes(
        resumeResponse.data.resumes.slice(0, 5)
      );

      setRecentInterviews(
        interviewResponse.data.interviews.slice(0, 5)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <DashboardCard
            title="Total Resumes"
            count={resumeCount}
          />

          <DashboardCard
            title="Total Interviews"
            count={interviewCount}
          />

        </div>

        <div className="flex gap-5 mt-10">

          <button
            onClick={() => navigate("/resume")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Create Resume
          </button>

          <button
            onClick={() => navigate("/interview")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Start Interview
          </button>

        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-10">

          <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-2xl font-semibold mb-4">
              Recent Resumes
            </h2>

            {
              recentResumes.length === 0 ? (
                <p>No resumes found.</p>
              ) : (
                recentResumes.map((resume) => (
                  <div
                    key={resume._id}
                    className="border-b py-3"
                  >
                    <h3 className="font-semibold">
                      {resume.title}
                    </h3>

                    <p className="text-gray-500">
                      {resume.summary}
                    </p>
                  </div>
                ))
              )
            }

          </div>

          <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-2xl font-semibold mb-4">
              Recent Interviews
            </h2>

            {
              recentInterviews.length === 0 ? (
                <p>No interviews found.</p>
              ) : (
                recentInterviews.map((interview) => (
                  <div
                    key={interview._id}
                    className="border-b py-3"
                  >
                    <h3 className="font-semibold">
                      {interview.title}
                    </h3>

                    <p className="text-gray-500">
                      {interview.role}
                    </p>
                  </div>
                ))
              )
            }

          </div>

        </div>

      </div>
    </>
  );
};

export default Dashboard;