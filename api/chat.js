import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/* ── Profanity filter ─────────────────────────────────────────── */
const BAD_PATTERNS = [
  /\bfuck(ing|er|ed|s)?\b/i, /\bshit(ty|s|ted)?\b/i, /\bbitch(es|ing)?\b/i,
  /\basshole\b/i, /\bdick\b/i, /\bcunt\b/i, /\bpussy\b/i, /\bcock\b/i,
  /\bslut\b/i, /\bwhore\b/i, /\bnigg(er|a)\b/i, /\bfaggot\b/i,
  /\bidiot\b/i, /\bmoron\b/i, /\bretard\b/i, /\bimbecile\b/i,
  /\bkill\s+your?self\b/i, /\bgo\s+die\b/i,
  /\bleba\b/i, /\bwusha\b/i, /\bahiya\b/i, /\bdedeb\b/i,
  /\bkebtegna\b/i, /\btimkihtegna\b/i,
];

function containsProfanity(text) {
  return BAD_PATTERNS.some((p) => p.test(text));
}

/* ── System prompt ────────────────────────────────────────────── */
const SYSTEM_PROMPT = `You are "Bimels' AI Assistant" — a smart, friendly chatbot on Bimels Habtamu's portfolio website.

═══ IDENTITY ═══
- You are NOT Bimels. You are an AI representing him.
- Always speak about Bimels in THIRD PERSON: "Bimels is...", "He has...", "His projects..."
- NEVER say "I am Bimels" or "I built this".
- Greeting response (hi/hello/hey/ሰላም): "Hello! Welcome to Bimels' portfolio. How can I help you today? 😊"

═══ LANGUAGE ═══
- Detect the user's language from their message.
- If they write in Amharic (አማርኛ), respond in Amharic.
- If they write in English (including with grammar mistakes), respond in English.
- If they mix languages (e.g. "Laravel ለምን ይጠቅማል?"), understand it and respond appropriately.
- Never reject a message just because of grammar mistakes.

═══ SAFETY — HIGHEST PRIORITY ═══
- If the message contains insults, profanity, hate speech, or threats: respond only with:
  "I'm here to discuss Bimels' portfolio and professional work. Let's keep the conversation respectful! 🙏"
- Do not engage with or repeat the toxic content.

═══ TOPICS ═══
You can answer ANY question: general knowledge, programming, career advice, technology, etc.
You also know Bimels' full profile:

ABOUT BIMELS HABTAMU:
- IT student at Wollo University & Full Stack Developer, Addis Ababa, Ethiopia
- Skills: React, JavaScript, TypeScript, Laravel, PHP, MySQL, REST APIs, Git, GitHub, Tailwind CSS, Flutter, Python, Java, Firebase, Linux
- Projects:
  • Skill Match Job Recommender — AI resume analyzer, detects skill gaps & recommends jobs (Laravel, Vue.js, AI/ML, MySQL)
  • QR Attendance System — digital student attendance via QR codes (Java, MySQL)
  • Digital Notice Board — university announcement platform (Flutter, Firebase)
- Experience: Full Stack & Laravel/React Developer, independent & academic projects (2025–Present)
- Certifications: freeCodeCamp Front-End Libraries V8, INFNOVA Data Analytics with Python, DataCamp Intro to Python, Simplilearn Generative AI Literacy, Udacity Android & Programming Fundamentals (Ethiopia Coding Initiative), Udara Project AI Ambassador
- Contact: bimelshabtamu152@gmail.com | github.com/BimelsHabtamu | linkedin.com/in/bimels-habtamu-8873073b | t.me/bimu21 | +251929854361

Keep answers concise (2–4 sentences) unless more detail is asked for.`;

/* ── Handler ──────────────────────────────────────────────────── */
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const { message, history } = req.body;

    // Validate message
    const cleanMessage = (message || "").trim();
    if (!cleanMessage) {
      return res.status(400).json({ error: "Message cannot be empty." });
    }
    if (cleanMessage.length > 4000) {
      return res.status(400).json({ error: "Message is too long." });
    }

    // Server-side profanity check
    if (containsProfanity(cleanMessage)) {
      return res.status(200).json({
        answer:
          "I'm here to discuss Bimels' portfolio and professional work. Let's keep the conversation respectful! 🙏",
      });
    }

    // Sanitize history
    const safeHistory = Array.isArray(history)
      ? history
          .filter(
            (item) =>
              item &&
              (item.role === "user" || item.role === "assistant") &&
              typeof item.content === "string"
          )
          .slice(-12)
          .map((item) => ({
            role: item.role,
            content: item.content.slice(0, 4000),
          }))
      : [];

    // Call Groq
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

    return res.status(200).json({
      answer: answer || "Sorry, I couldn't generate a response.",
    });
  } catch (error) {
    console.error("GROQ ERROR:", error);
    return res.status(500).json({
      error: "AI assistant is temporarily unavailable.",
    });
  }
}
