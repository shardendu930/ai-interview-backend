import { useNavigate } from "react-router-dom";

const LandingNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
          CareerPilot AI
        </h1>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 text-gray-700">
          <a href="#">Features</a>
          <a href="#">How It Works</a>
          <a href="#">FAQ</a>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Get Started
          </button>
        </div>

      </div>
    </nav>
  );
};

export default LandingNavbar;