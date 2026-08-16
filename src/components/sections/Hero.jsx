import { motion } from "framer-motion";
import {
  ArrowDown,
  BriefcaseBusiness,
  Download,
  GitBranch,
  Send,
} from "lucide-react";
import { TypeAnimation } from "react-type-animation";

import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

function Hero() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <section
      id="home"
      className={`relative flex min-h-screen items-center overflow-hidden px-6 pt-24 ${
        isDark ? "bg-[#08080c]" : "bg-white"
      }`}
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Main glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600 blur-[150px]"
        />

        {/* Secondary glow */}
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-100px] top-[20%] h-[300px] w-[300px] rounded-full bg-fuchsia-600/20 blur-[120px]"
        />

        {/* Grid */}
        <div
          className={`absolute inset-0 opacity-[0.04] ${
            isDark ? "block" : "hidden"
          }`}
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">

        {/* ===================================================
            LEFT SIDE
        ==================================================== */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          {/* Small intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-violet-500" />

            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-500">
              {t.hello}
            </span>
          </motion.div>

          {/* Main heading */}
          <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">

            <span
              className={
                isDark
                  ? "text-white"
                  : "text-gray-900"
              }
            >
              I build
            </span>

            <br />

            <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
              digital experiences.
            </span>

          </h1>

          {/* Typing role */}
          <div
            className={`mt-7 flex min-h-[38px] items-center text-xl font-semibold sm:text-2xl ${
              isDark
                ? "text-gray-300"
                : "text-gray-700"
            }`}
          >

            <span className="mr-2 text-violet-500">
              —
            </span>

            <TypeAnimation
              key={language}
              sequence={
                language === "en"
                  ? [
                      "Full Stack Developer",
                      2000,
                      "React Developer",
                      2000,
                      "Laravel Developer",
                      2000,
                      "AI Enthusiast",
                      2000,
                    ]
                  : [
                      "Full Stack Developer",
                      2000,
                      "React Developer",
                      2000,
                      "Laravel Developer",
                      2000,
                      "AI ቴክኖሎጂ አድናቂ",
                      2000,
                    ]
              }
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />

          </div>

          {/* Description */}
          <p
            className={`mt-6 max-w-2xl text-lg leading-8 ${
              isDark
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            {t.heroDescription}
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-wrap gap-4">

            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="#projects"
              className="group flex items-center gap-2 rounded-full bg-violet-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500"
            >
              {t.viewWork}

              <ArrowDown
                size={17}
                className="transition group-hover:translate-y-1"
              />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="/resume.pdf"
              download
              className={`group flex items-center gap-2 rounded-full border px-7 py-3.5 font-semibold transition ${
                isDark
                  ? "border-white/15 text-white hover:border-violet-500 hover:text-violet-400"
                  : "border-gray-300 text-gray-900 hover:border-violet-500 hover:text-violet-600"
              }`}
            >
              <Download size={17} />

              {t.downloadResume}
            </motion.a>

          </div>

          {/* Social links */}
          <div
            className={`mt-10 flex items-center gap-4 ${
              isDark
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >

            <span className="mr-2 text-xs uppercase tracking-widest">
              Connect
            </span>

            <a
              href="https://github.com/BimelsHabtamu"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-full border border-current/10 p-2.5 transition hover:border-violet-500 hover:text-violet-500"
            >
              <GitBranch size={19} />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-full border border-current/10 p-2.5 transition hover:border-violet-500 hover:text-violet-500"
            >
              <BriefcaseBusiness size={19} />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="rounded-full border border-current/10 p-2.5 transition hover:border-violet-500 hover:text-violet-500"
            >
              <Send size={19} />
            </a>

          </div>

        </motion.div>

        {/* ===================================================
            RIGHT SIDE
        ==================================================== */}

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.2,
          }}
          className="relative mx-auto flex h-[480px] w-full max-w-[480px] items-center justify-center"
        >

          {/* Rotating outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-[390px] w-[390px] rounded-full border border-dashed border-violet-500/20"
          />

          {/* Second rotating ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-[330px] w-[330px] rounded-full border border-violet-500/10"
          />

          {/* Main glow */}
          <div className="absolute h-[280px] w-[280px] rounded-full bg-violet-600/20 blur-[90px]" />

          {/* Profile card */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`relative z-10 flex h-[290px] w-[240px] items-end justify-center overflow-hidden rounded-[40px] border shadow-2xl ${
              isDark
                ? "border-white/10 bg-white/[0.04]"
                : "border-gray-200 bg-white shadow-gray-300/30"
            }`}
          >

            <img
              src="/images/profile.png"
              alt="Bimels Habtamu"
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />

            {/* Fallback */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20">
              <span className="text-8xl font-black text-violet-500">
                B
              </span>
            </div>

          </motion.div>

          {/* Floating technology badges */}

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute left-0 top-24 z-20 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-xl backdrop-blur-xl ${
              isDark
                ? "border-white/10 bg-black/40"
                : "border-gray-200 bg-white/80"
            }`}
          >
            <span className="mr-2">⚛</span>
            React
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute right-0 top-20 z-20 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-xl backdrop-blur-xl ${
              isDark
                ? "border-white/10 bg-black/40"
                : "border-gray-200 bg-white/80"
            }`}
          >
            <span className="mr-2">◆</span>
            Laravel
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute bottom-20 left-4 z-20 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-xl backdrop-blur-xl ${
              isDark
                ? "border-white/10 bg-black/40"
                : "border-gray-200 bg-white/80"
            }`}
          >
            <span className="mr-2">✦</span>
            AI
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute bottom-12 right-0 z-20 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-xl backdrop-blur-xl ${
              isDark
                ? "border-white/10 bg-black/40"
                : "border-gray-200 bg-white/80"
            }`}
          >
            <span className="mr-2">JS</span>
            JavaScript
          </motion.div>

        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className={`absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs md:flex ${
          isDark
            ? "text-gray-500"
            : "text-gray-400"
        }`}
      >
        <span>Scroll</span>
        <ArrowDown size={16} />
      </motion.a>

    </section>
  );
}

export default Hero;