// pages/api/chatbot.js

import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
      });

      const botMessage = response.choices[0].message.content.trim();
      res.status(200).json({ botMessage });
    } catch (error) {
      console.error("Error fetching response from OpenAI:", error);
      res.status(500).json({ error: "Failed to fetch response from OpenAI." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
