import StepCard from "./StepCard";

const steps = [
  {
    number: "1️⃣",
    title: "Upload Resume",
    description: "Upload your resume securely.",
  },
  {
    number: "2️⃣",
    title: "Start Interview",
    description: "Practice AI-generated interview questions.",
  },
  {
    number: "3️⃣",
    title: "Get Feedback",
    description: "Receive detailed AI feedback instantly.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-6">

      <h2 className="text-4xl font-bold text-center mb-12">
        How It Works
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {steps.map((step) => (
          <StepCard
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
          />
        ))}

      </div>

    </section>
  );
};

export default HowItWorks;