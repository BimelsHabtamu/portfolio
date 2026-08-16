import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Loader2, Trash2 } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { sendMessage } from "../../services/gemini";

/* ── Quick suggestion chips ─────────────────────────── */
const SUGGESTIONS = {
  en: [
    "What are Bimels' skills?",
    "Tell me about his projects",
    "How can I contact him?",
    "What certifications does he have?",
  ],
  am: [
    "What are Bimels' skills?",
    "Tell me about his projects",
    "How can I contact him?",
    "What certifications does he have?",
  ],
};

/* ── Typing indicator ───────────────────────────────── */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-violet-400"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

/* ── Single message bubble ──────────────────────────── */
function MessageBubble({ msg, isDark }) {
  const isUser = msg.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white ${
          isUser ? "bg-violet-600" : "bg-violet-500/20"
        }`}
      >
        {isUser ? <User size={14} /> : <Bot size={14} className="text-violet-400" />}
      </span>

      {/* Bubble */}
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-sm bg-violet-600 text-white"
            : isDark
            ? "rounded-bl-sm bg-white/[0.07] text-gray-100"
            : "rounded-bl-sm bg-gray-100 text-gray-800"
        }`}
      >
        {msg.text}
      </div>
    </motion.div>
  );
}

/* ── Main ChatBot component ─────────────────────────── */
function ChatBot() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === "dark";

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Greeting based on language
  const greeting = {
    en: "Hello! Welcome to Bimels' portfolio 👋\nI'm his AI assistant. Ask me about his skills, projects, experience, or anything else!",
    am: "Hello! Welcome to Bimels' portfolio 👋\nI'm his AI assistant. Feel free to ask me anything about him!",
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || isLoading) return;

    setInput("");
    setShowSuggestions(false);
    setError(null);

    const userMsg = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const reply = await sendMessage(messages, trimmed);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (err) {
      if (err.message === "NO_KEY") {
        setError("API key not configured. Please add your Groq key to .env");
      } else if (err.message === "PROFANITY") {
        // Show as bot reply bubble, not a red error bar
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "I'm here to discuss Bimels' portfolio and professional work. Let's keep the conversation respectful! 🙏",
          },
        ]);
      } else {
        setError("Couldn't get a response. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setShowSuggestions(true);
    setError(null);
  };

  const suggestions = SUGGESTIONS[language] || SUGGESTIONS.en;

  return (
    <>
      {/* ── Floating toggle button ─────────────────────── */}
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Open AI chat"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-violet-700 text-white shadow-xl shadow-violet-600/40"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-2xl leading-none"
            >
              🤖
            </motion.span>
          )}
        </AnimatePresence>

        {/* Small AI badge */}
        {!isOpen && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-[9px] font-black text-white shadow-md">
            AI
          </span>
        )}
      </motion.button>

      {/* ── Chat window ───────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`fixed bottom-24 right-6 z-[90] flex w-[320px] flex-col overflow-hidden rounded-3xl border shadow-2xl shadow-black/40 ${
              isDark
                ? "border-white/10 bg-[#0f0f18]"
                : "border-gray-200 bg-white"
            }`}
            style={{ height: "460px" }}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-violet-500/20 bg-violet-600/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-xl">
                  🤖
                </span>
                <div>
                  <p className="text-sm font-bold">Bimels' AI Assistant</p>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <p className="text-xs text-emerald-400">Online</p>
                  </div>
                </div>
              </div>

              {/* Clear chat */}
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  aria-label="Clear chat"
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition hover:text-violet-400 ${
                    isDark ? "text-gray-500 hover:bg-white/5" : "text-gray-400 hover:bg-gray-100"
                  }`}
                >
                  <Trash2 size={15} />
                </button>
              )}
            </div>

            {/* Messages area */}
            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">

              {/* Greeting */}
              <div className={`flex items-end gap-2`}>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/20">
                  <Bot size={14} className="text-violet-400" />
                </span>
                <div
                  className={`max-w-[78%] whitespace-pre-line rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm leading-relaxed ${
                    isDark ? "bg-white/[0.07] text-gray-100" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {greeting[language] || greeting.en}
                </div>
              </div>

              {/* Suggestion chips */}
              {showSuggestions && messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pl-9">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSend(s)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition hover:border-violet-500 hover:text-violet-400 ${
                        isDark
                          ? "border-white/10 bg-white/[0.04] text-gray-300"
                          : "border-gray-200 bg-gray-50 text-gray-600"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Conversation */}
              {messages.map((msg, i) => (
                <MessageBubble key={i} msg={msg} isDark={isDark} />
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-end gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/20">
                    <Bot size={14} className="text-violet-400" />
                  </span>
                  <div className={`rounded-2xl rounded-bl-sm px-4 py-3 ${isDark ? "bg-white/[0.07]" : "bg-gray-100"}`}>
                    <TypingDots />
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-400"
                >
                  {error}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <div className={`shrink-0 border-t p-3 ${isDark ? "border-white/10" : "border-gray-200"}`}>
              <div className={`flex items-end gap-2 rounded-2xl border px-4 py-2.5 transition focus-within:border-violet-500 ${
                isDark
                  ? "border-white/10 bg-white/[0.04]"
                  : "border-gray-200 bg-gray-50"
              }`}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  rows={1}
                  className={`flex-1 resize-none bg-transparent text-sm outline-none ${
                    isDark ? "text-white placeholder:text-gray-500" : "text-gray-900 placeholder:text-gray-400"
                  }`}
                  style={{ maxHeight: "80px" }}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  aria-label="Send"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white transition hover:bg-violet-500 disabled:opacity-40"
                >
                  {isLoading ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <Send size={15} />
                  )}
                </button>
              </div>
              <p className={`mt-2 text-center text-[10px] ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                Powered by Groq · Llama 3.3
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ChatBot;
