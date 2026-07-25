import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-7xl font-bold text-red-600">
        404
      </h1>

      <h2 className="text-2xl font-semibold mt-4">
        Page Not Found
      </h2>

      <Link
        to="/dashboard"
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;