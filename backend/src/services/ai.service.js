const { GoogleGenAI } = require("@google/genai");

console.log("Gemini key loaded:", !!process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateInterviewQuestions(role, difficulty, numberOfQuestions) {
  const prompt = `
    
    Generate ${numberOfQuestions} interview questions.

    Role: ${role}

    Difficulty: ${difficulty}

    Return ONLY valid JSON.

    Format:

    [
      {
        "question":"..."
    }
    ]
    `;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
  });

  const text = response.text;

  const questions = JSON.parse(text);

  console.log(questions);

  return questions;
}

async function evaluateInterviewAnswers(questions) {
  try {
    const prompt = `
You are an experienced technical interviewer.

Evaluate each interview answer.

For every question:

1. Give a score out of 10.
2. Give short constructive feedback.

Return ONLY valid JSON in this format:

[
  {
    "score": 8,
    "feedback": "Good answer. Mentioned the main concepts."
  }
]

Interview Questions:

${JSON.stringify(questions)}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });

    let text = response.text;

    // Remove markdown code blocks if Gemini returns them
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Convert JSON string into JavaScript object
    const evaluation = JSON.parse(text);

    return evaluation;
  } catch (error) {
    console.log("Error evaluating interview:", error);
    throw error;
  }
}

module.exports = {
  generateInterviewQuestions,
  evaluateInterviewAnswers,
};
