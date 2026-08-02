const DashboardCard = ({ title, count, icon, color }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      {/* Icon */}

      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${color}`}
      >
        {icon}
      </div>

      {/* Title */}

      <h2 className="text-gray-500 text-lg font-medium mt-5">
        {title}
      </h2>

      {/* Count */}

      <p className="text-4xl font-bold mt-2">
        {count}
      </p>

    </div>
  );
};

export default DashboardCard;