import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Quiz route
app.get("/api/quiz", async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Generate 5 multiple-choice quiz questions on JavaScript.
    Each question must have:
    - "question": a string
    - "options": an array of 4 strings (choices A, B, C, D)
    - "answer": the correct option letter (A, B, C, or D)

    Return ONLY valid JSON array (no extra text, no markdown).
    Example:
    [
      {
        "question": "What is the output of console.log(typeof null)?",
        "options": ["A. null", "B. object", "C. undefined", "D. number"],
        "answer": "B"
      }
    ]
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Clean JSON in case Gemini adds code blocks
    const cleanText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let quiz;
    try {
      quiz = JSON.parse(cleanText);
    } catch (e) {
      console.error("JSON parse error:", e.message);
      quiz = { raw: responseText }; // fallback to raw
    }

    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch quiz questions" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
