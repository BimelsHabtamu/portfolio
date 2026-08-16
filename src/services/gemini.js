/**
 * AI Chat Service
 * Calls the Vercel serverless function at /api/chat
 * The Groq API key lives server-side in .env.local — never exposed to the browser
 */

/* ── Client-side profanity pre-check ─────────────────────────── */
const BAD_PATTERNS = [
  /\bfuck(ing|er|ed|s)?\b/i, /\bshit(ty|s|ted)?\b/i, /\bbitch(es|ing)?\b/i,
  /\basshole\b/i, /\bdick\b/i, /\bcunt\b/i, /\bpussy\b/i, /\bcock\b/i,
  /\bslut\b/i, /\bwhore\b/i, /\bnigg(er|a)\b/i, /\bfaggot\b/i,
  /\bidiot\b/i, /\bmoron\b/i, /\bretard\b/i,
  /\bkill\s+your?self\b/i, /\bgo\s+die\b/i,
  /\bleba\b/i, /\bwusha\b/i, /\bahiya\b/i, /\bdedeb\b/i,
];

export function containsProfanity(text) {
  return BAD_PATTERNS.some((p) => p.test(text));
}

/**
 * Send a message to the /api/chat serverless function.
 * @param {Array<{role: string, text: string}>} history
 * @param {string} userMessage
 * @returns {Promise<string>}
 */
export async function sendMessage(history, userMessage) {
  // Client-side hard block before any network call
  if (containsProfanity(userMessage)) {
    throw new Error("PROFANITY");
  }

  // Convert internal history format to OpenAI-compatible format
  const formattedHistory = history.map((msg) => ({
    role: msg.role === "user" ? "user" : "assistant",
    content: msg.text,
  }));

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: userMessage,
      history: formattedHistory,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}`);
  }

  return data.answer ?? "Sorry, I couldn't generate a response.";
}
