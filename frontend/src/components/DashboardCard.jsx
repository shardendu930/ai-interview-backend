const DashboardCard = ({ title, count }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
      <h2 className="text-gray-600 text-lg">{title}</h2>

      <p className="text-4xl font-bold text-blue-600 mt-3">
        {count}
      </p>
    </div>
  );
};

export default DashboardCard;