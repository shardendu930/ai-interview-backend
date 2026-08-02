const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Software Engineer",
    review:
      "CareerPilot AI helped me prepare for my backend interviews. The AI feedback was extremely useful.",
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "Frontend Developer",
    review:
      "The resume analysis feature improved my ATS score and helped me get shortlisted.",
  },
  {
    id: 3,
    name: "Aman Singh",
    role: "Full Stack Developer",
    review:
      "The interview experience felt like talking to a real interviewer.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12">
        What Our Users Say
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-lg rounded-xl p-6"
          >
            <p className="text-gray-600 mb-4">
              "{user.review}"
            </p>

            <h3 className="font-bold text-lg">
              {user.name}
            </h3>

            <p className="text-gray-500">
              {user.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;