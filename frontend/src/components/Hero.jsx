import interviewImage from "../assets/interviewImage.png";
const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-16 bg-linear-to-br from-blue-50 via-white to-indigo-50">
      
      {/* Left Content */}
      <div className="flex-1 max-w-xl">

        <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
  🚀      AI-Powered Career Coach
        </div>

        <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
         Crack Your Dream Job with
         <span className="text-blue-600">
           {" "}AI-Powered Interviews
         </span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 leading-8">
          Practice realistic interviews, analyze your resume,
          and receive personalized AI feedback to improve your
          confidence before every interview.
        </p>

        <div className="mt-8 flex gap-4">

        <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          Get Started
        </button>

        <button className="border border-gray-300 bg-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 hover:-translate-y-1 transition-all duration-300">
          Watch Demo
        </button>

       </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex justify-center mt-12 lg:mt-0">

        <img
          src={interviewImage}
          alt="AI Interview Illustration"
          className="w-full max-w-xl lg:max-w-2xl rounded-2xl shadow-2xl hover:scale-105 transition-all duration-500"
        />

      </div>

    </section>
  );
};

export default Hero;