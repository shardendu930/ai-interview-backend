const features = [
  {
    title: "AI Interviews",
    description: "Practice interviews with AI-generated questions.",
    icon: "🤖",
  },
  {
    title: "Resume Analysis",
    description: "Analyze your resume and improve your ATS score.",
    icon: "📄",
  },
  {
    title: "Instant Feedback",
    description: "Receive personalized AI feedback after every interview.",
    icon: "⚡",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-white">

      <h2 className="text-4xl font-bold text-center">
        Why Choose CareerPilot AI?
      </h2>

      <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
        Everything you need to prepare confidently for your next interview.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mt-14 max-w-6xl mx-auto px-6">

        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >

            <div className="text-6xl mb-5">
              {feature.icon}
            </div>

            <h3 className="text-2xl font-semibold mb-4">
              {feature.title}
            </h3>

            <p className="text-gray-600">
              {feature.description}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
};

export default Features;