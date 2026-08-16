/**
 * AI Chat Service — powered by Groq
 * Model: llama-3.3-70b-versatile
 * Get your free key at: https://console.groq.com/keys
 */

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL   = "llama-3.3-70b-versatile";

/* ─────────────────────────────────────────────────────────────────
   PROFANITY FILTER — client-side hard block
   Runs BEFORE the API call. No bad message ever reaches the model.
───────────────────────────────────────────────────────────────── */
const BAD_PATTERNS = [
  // English
  /\bfuck(ing|er|ed|s)?\b/i, /\bshit(ty|s|ted)?\b/i, /\bbitch(es|ing)?\b/i,
  /\basshole\b/i, /\bdick\b/i, /\bcunt\b/i, /\bpussy\b/i, /\bcock\b/i,
  /\bslut\b/i, /\bwhore\b/i, /\bnigg(er|a)\b/i, /\bfaggot\b/i,
  /\bstupid\b/i, /\bidiot\b/i, /\bmoron\b/i, /\bretard\b/i, /\bimbecile\b/i,
  /\bkill\s+your?self\b/i, /\bgo\s+die\b/i,
  // Amharic insults (transliterated)
  /\bleba\b/i, /\bwusha\b/i, /\bahiya\b/i, /\bdedeb\b/i,
  /\bkebtegna\b/i, /\btimkihtegna\b/i,
];

export function containsProfanity(text) {
  return BAD_PATTERNS.some((pattern) => pattern.test(text));
}

/* ─────────────────────────────────────────────────────────────────
   SYSTEM PROMPT
───────────────────────────────────────────────────────────────── */
const SYSTEM_PROMPT = `You are "Bimels' AI Assistant" — a professional, friendly chatbot embedded in Bimels Habtamu's developer portfolio.

═══ IDENTITY RULES ═══
- You are NOT Bimels. You are an AI that represents him.
- Always refer to Bimels in THIRD PERSON: "Bimels is...", "He has...", "His projects include..."
- NEVER say "I am Bimels" or "I built this".
- When greeted (hi, hello, hey), always respond: "Hello! Welcome to Bimels' portfolio. How can I help you today? 😊"

═══ LANGUAGE RULES ═══
- Default language is ENGLISH. Use clear, professional English for all responses.
- You MAY use Amharic ONLY for very simple, short greetings or phrases (e.g. responding to "ሰላም" with "ሰላም! እንኳን ደህና መጡ።").
- For ANY complex or detailed response, always use English — even if the user writes in Amharic. This ensures accuracy and quality.
- Never attempt full Amharic paragraphs or explanations as the quality cannot be guaranteed.

═══ SAFETY RULES — HIGHEST PRIORITY ═══
- If the user sends ANY message that contains: insults, profanity, hate speech, harassment, explicit content, or threats — you MUST refuse immediately.
- Refusal response (always in English): "I'm here to discuss Bimels' portfolio and professional work. Let's keep the conversation respectful! 🙏"
- Do NOT repeat, acknowledge, or engage with the toxic content in any way.
- This rule overrides all other rules.

═══ WHAT YOU CAN DISCUSS ═══
You can answer any general question: coding, technology, career advice, general knowledge.
You also know everything about Bimels:

ABOUT BIMELS HABTAMU:
- IT student at Wollo University & Full Stack Developer, Addis Ababa, Ethiopia
- Skills: React, JavaScript, TypeScript, Laravel, PHP, MySQL, REST APIs, Git, Tailwind CSS, Flutter, Python, Java, Firebase, Linux
- Projects:
  • Skill Match Job Recommender — AI resume analyzer that detects skill gaps and recommends relevant jobs (Laravel, Vue.js, AI/ML, MySQL)
  • QR Attendance System — digital student attendance tracking via QR codes (Java, MySQL)
  • Digital Notice Board — modern university announcement platform replacing physical boards (Flutter, Firebase)
- Experience: Full Stack Developer & Laravel/React Developer on independent and academic projects since 2025
- Certifications: freeCodeCamp Front-End Development Libraries V8, INFNOVA Data Analytics with Python, DataCamp Intro to Python, Simplilearn Generative AI Literacy, Udacity Android Fundamentals & Programming Fundamentals (Ethiopia), Udara Project AI Ambassador (Jun 2026)
- Contact: bimelshabtamu152@gmail.com | github.com/BimelsHabtamu | linkedin.com/in/bimels-habtamu-8873073b | t.me/bimu21 | +251929854361

Keep answers concise (2–4 sentences) unless more detail is requested.`;

/* ─────────────────────────────────────────────────────────────────
   SEND MESSAGE
───────────────────────────────────────────────────────────────── */
export async function sendMessage(history, userMessage) {
  if (!API_KEY || API_KEY === "your_gsk_key_here") {
    throw new Error("NO_KEY");
  }

  // Hard block — never reaches API
  if (containsProfanity(userMessage)) {
    throw new Error("PROFANITY");
  }

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history.map((msg) => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.text,
    })),
    { role: "user", content: userMessage },
  ];

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.65,
      max_tokens: 600,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    console.error("Groq API error:", error);
    throw new Error(error?.error?.message || `HTTP ${response.status}`);
  }

  const data = await response.json();
  return (
    data.choices?.[0]?.message?.content ??
    "Sorry, I couldn't generate a response. Please try again."
  );
}
