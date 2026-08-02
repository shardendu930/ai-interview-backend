const StepCard = ({ number, title, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 text-center">
      <div className="text-5xl mb-4">
        {number}
      </div>

      <h3 className="text-2xl font-semibold mb-3">
        {title}
      </h3>

      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default StepCard;
