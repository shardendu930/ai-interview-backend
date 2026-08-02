const faqs = [
  {
    question: "Is CareerPilot AI free?",
    answer: "Yes, you can practice AI interviews for free.",
  },
  {
    question: "Can I upload my resume?",
    answer: "Yes, you can upload your resume and receive AI feedback.",
  },
  {
    question: "Will I get interview feedback?",
    answer: "Yes, after every interview the AI generates personalized feedback.",
  },
];

const FAQ = () => {
  return (
    <section className="py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h2>

      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="border rounded-xl p-6 shadow"
          >
            <h3 className="font-semibold text-xl">
              {faq.question}
            </h3>

            <p className="text-gray-600 mt-2">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;