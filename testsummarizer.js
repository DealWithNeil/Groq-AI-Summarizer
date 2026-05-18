import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const article = `
Not doing something will always be faster than doing it. This statement reminds me of the old computer programming saying, “Remember that there is no code faster than no code.”
The same philosophy applies in other areas of life. For example, there is no meeting that goes faster than not having a meeting at all.
This is not to say you should never attend another meeting, but the truth is that we say yes to many things we don't actually want to do. There are many meetings held that don't need to be held. There is a lot of code written that could be deleted.
`;

async function summarize() {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "Summarize the following article into exactly 3 bullet points." },
          { role: "user", content: article }
        ],
        max_tokens: 200,
        temperature: 0.5
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const summaryText = response.data.choices[0].message.content;

    // Optional: format as 3 bullets
    const sentences = summaryText.split(/\. |\n/).slice(0, 3);
    const bullets = sentences.map(s => "• " + s.trim()).join("\n");

    console.log("=== Summary ===\n");
    console.log(bullets);

  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
}

summarize();