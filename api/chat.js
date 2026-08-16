const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/* ── Profanity filter ─────────────────────────────────────────── */
const BAD_PATTERNS = [
  /\bfuck(ing|er|ed|s)?\b/i, /\bshit(ty|s|ted)?\b/i, /\bbitch(es|ing)?\b/i,
  /\basshole\b/i, /\bdick\b/i, /\bcunt\b/i, /\bpussy\b/i, /\bcock\b/i,
  /\bslut\b/i, /\bwhore\b/i, /\bnigg(er|a)\b/i, /\bfaggot\b/i,
  /\bidiot\b/i, /\bmoron\b/i, /\bretard\b/i,
  /\bkill\s+your?self\b/i, /\bgo\s+die\b/i,
  /\bleba\b/i, /\bwusha\b/i, /\bahiya\b/i, /\bdedeb\b/i,
];

function containsProfanity(text) {
  return BAD_PATTERNS.some((p) => p.test(text));
}

const SYSTEM_PROMPT = `You are "Bimels' AI Assistant" — a smart, friendly chatbot on Bimels Habtamu's portfolio website.

IDENTITY:
- You are NOT Bimels. You are an AI representing him.
- Always speak about Bimels in THIRD PERSON: "Bimels is...", "He has...", "His projects..."
- NEVER say "I am Bimels" or "I built this".
- When greeted (hi/hello/hey): respond with "Hello! Welcome to Bimels' portfolio. How can I help you today? 😊"

LANGUAGE:
- If the user writes in Amharic, respond in Amharic.
- If the user writes in English (even with grammar mistakes), respond in English.
- Never reject a message due to grammar mistakes.

SAFETY (HIGHEST PRIORITY):
- If the message contains insults, profanity or hate speech, respond only with:
  "I'm here to discuss Bimels' portfolio and professional work. Let's keep the conversation respectful! 🙏"

ABOUT BIMELS:
- IT student at Wollo University & Full Stack Developer, Addis Ababa, Ethiopia
- Skills: React, JavaScript, TypeScript, Laravel, PHP, MySQL, REST APIs, Git, Tailwind CSS, Flutter, Python, Java, Firebase, Linux
- Projects: Skill Match Job Recommender (Laravel/Vue/AI), QR Attendance System (Java/MySQL), Digital Notice Board (Flutter/Firebase)
- Experience: Full Stack & Laravel/React Developer, 2025-Present
- Certifications: freeCodeCamp Front-End Libraries, INFNOVA Data Analytics Python, DataCamp Python, Simplilearn Generative AI, Udacity Android & Programming Fundamentals, Udara Project Ambassador
- Contact: bimelshabtamu152@gmail.com | github.com/BimelsHabtamu | t.me/bimu21 | +251929854361

Keep answers concise (2-4 sentences) unless more detail is asked for.`;

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });

  try {
    const { message, history } = req.body;

    const cleanMessage = (message || "").trim();
    if (!cleanMessage) return res.status(400).json({ error: "Message cannot be empty." });
    if (cleanMessage.length > 4000) return res.status(400).json({ error: "Message is too long." });

    if (containsProfanity(cleanMessage)) {
      return res.status(200).json({
        answer: "I'm here to discuss Bimels' portfolio and professional work. Let's keep the conversation respectful! 🙏",
      });
    }

    const safeHistory = Array.isArray(history)
      ? history
          .filter((item) => item && (item.role === "user" || item.role === "assistant") && typeof item.content === "string")
          .slice(-12)
          .map((item) => ({ role: item.role, content: item.content.slice(0, 4000) }))
      : [];

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...safeHistory,
        { role: "user", content: cleanMessage },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    });

    const answer = completion.choices?.[0]?.message?.content;
    return res.status(200).json({ answer: answer || "Sorry, I couldn't generate a response." });

  } catch (error) {
    console.error("GROQ ERROR:", error);
    return res.status(500).json({ error: "AI assistant is temporarily unavailable." });
  }
};
