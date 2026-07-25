import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();

  const { setUser, setIsAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");

      setUser(null);
      setIsAuthenticated(false);

      toast.success("Logged out successfully");

      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">
        AI Interview Platform
      </h1>

      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;