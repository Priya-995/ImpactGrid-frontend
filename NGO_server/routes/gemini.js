// routes/groq.js
const express = require("express");
const Groq = require("groq-sdk");

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/match-reason", async (req, res) => {
  try {
    const { volunteer, match, caseData } = req.body;

    const prompt = `
You are ImpactGrid AI.

Explain why this volunteer is suitable.

Case:
${JSON.stringify(caseData)}

Volunteer:
${JSON.stringify(volunteer)}

Match:
${JSON.stringify(match)}

Give 3 short bullet points.
`;

   const completion = await groq.chat.completions.create({
   model: "llama-3.3-70b-versatile",
  messages: [
    {
      role: "system",
      content: "You are ImpactGrid AI. Give crisp, useful reasoning in 3 short bullet points.",
    },
    {
      role: "user",
      content: prompt,
    },
  ],
  temperature: 0.5,
});

    const text = completion.choices[0].message.content;

    res.json({
      success: true,
      reason: text,
    });

  } catch (error) {
    console.error("Groq error:", error);

    res.status(500).json({
      success: false,
      reason: "AI reasoning failed",
    });
  }
});

module.exports = router;