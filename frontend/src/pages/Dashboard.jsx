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

      setRecentResumes(resumeResponse.data.resumes.slice(0, 5));
      setRecentInterviews(interviewResponse.data.interviews.slice(0, 5));
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

      <div className="min-h-screen bg-gray-50 px-8 py-10">

        {/* Welcome Section */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Ready to ace your next interview?
          </p>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <DashboardCard
              title="Total Resumes"
              count={resumeCount}
              icon="📄"
              color="bg-blue-100"
          />

          <DashboardCard
               title="Total Interviews"
               count={interviewCount}
               icon="🎤"
               color="bg-green-100"
          />

        </div>

        {/* Quick Actions */}

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <div
            onClick={() => navigate("/resume")}
            className="bg-blue-600 text-white rounded-2xl p-8 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <h2 className="text-2xl font-bold">
              Create Resume
            </h2>

            <p className="mt-2 text-blue-100">
              Build an ATS-friendly resume in minutes.
            </p>
          </div>

          <div
            onClick={() => navigate("/interview")}
            className="bg-green-600 text-white rounded-2xl p-8 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <h2 className="text-2xl font-bold">
              Start Interview
            </h2>

            <p className="mt-2 text-green-100">
              Practice AI-powered mock interviews.
            </p>
          </div>

        </div>

        {/* Lists */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          {/* Recent Resumes */}

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-2xl font-bold mb-5">
              📄 Recent Resumes
            </h2>

            {recentResumes.length === 0 ? (
              <p className="text-gray-500">
                No resumes uploaded yet.
              </p>
            ) : (
              recentResumes.map((resume) => (
                <div
                  key={resume._id}
                  className="flex justify-between items-center py-4 border-b"
                >
                  <div>
                    <h3 className="font-semibold">
                      {resume.title}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {resume.summary}
                    </p>
                  </div>

                  <button
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>

                </div>
              ))
            )}

          </div>

          {/* Recent Interviews */}

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-2xl font-bold mb-5">
              🎤 Recent Interviews
            </h2>

            {recentInterviews.length === 0 ? (
              <p className="text-gray-500">
                No interviews taken yet.
              </p>
            ) : (
              recentInterviews.map((interview) => (
                <div
                  key={interview._id}
                  className="flex justify-between items-center py-4 border-b hover:bg-gray-50 transition px-2 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">
                      {interview.title}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {interview.role}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(`/interview/${interview._id}`)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    Open
                  </button>

                </div>
              ))
            )}

          </div>

        </div>

      </div>
    </>
  );
};

export default Dashboard;