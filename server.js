import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

app.post("/summarize", async (req, res) => {
  try {
    const { article } = req.body;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "Summarize the following article into 3 bullet points:" },
          { role: "user", content: article }
        ],
        max_tokens: 200,
        temperature: 0.5
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const summaryText = response.data.choices[0].message.content;
    res.json({ summary: summaryText });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "AI request failed." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});