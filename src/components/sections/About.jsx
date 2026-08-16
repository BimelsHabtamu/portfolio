import { motion } from "framer-motion";
import {
  Code2,
  BrainCircuit,
  Rocket,
  GraduationCap,
} from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

function About() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const stats = [
    {
      value: "10+",
      label: t.projectsLabel,
      icon: Rocket,
    },
    {
      value: "3+",
      label: t.yearsLearning,
      icon: GraduationCap,
    },
    {
      value: "15+",
      label: t.technologies,
      icon: Code2,
    },
    {
      value: "∞",
      label: t.curiosity,
      icon: BrainCircuit,
    },
  ];

  return (
    <section
      id="about"
      className={`relative overflow-hidden border-t px-6 py-32 ${
        isDark
          ? "border-white/10"
          : "border-gray-200"
      }`}
    >

      {/* Background decoration */}
      <div className="pointer-events-none absolute right-[-150px] top-[20%] h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-500">
            {t.aboutLabel}
          </p>

          <h2 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            {t.aboutTitle}
          </h2>
        </motion.div>

        {/* Main content */}
        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-center">

          {/* Left - visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >

            <div
              className={`relative mx-auto aspect-square max-w-[430px] overflow-hidden rounded-[40px] border ${
                isDark
                  ? "border-white/10 bg-white/[0.03]"
                  : "border-gray-200 bg-gray-50"
              }`}
            >

              {/* Decorative grid */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(139,92,246,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.8) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Center graphic */}
              <div className="absolute inset-0 flex items-center justify-center">

                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute h-64 w-64 rounded-full border border-dashed border-violet-500/30"
                />

                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative flex h-44 w-44 items-center justify-center rounded-[32px] bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-2xl shadow-violet-600/30"
                >
                  <span className="text-7xl font-black text-white">
                    B.
                  </span>
                </motion.div>

              </div>

              {/* Floating labels */}

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className={`absolute left-5 top-8 rounded-2xl border px-4 py-3 text-sm font-semibold backdrop-blur-xl ${
                  isDark
                    ? "border-white/10 bg-black/40"
                    : "border-gray-200 bg-white/80"
                }`}
              >
                React.js
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                }}
                className={`absolute bottom-8 right-5 rounded-2xl border px-4 py-3 text-sm font-semibold backdrop-blur-xl ${
                  isDark
                    ? "border-white/10 bg-black/40"
                    : "border-gray-200 bg-white/80"
                }`}
              >
                AI
              </motion.div>

            </div>

          </motion.div>

          {/* Right - content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >

            <p
              className={`text-lg leading-8 ${
                isDark
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            >
              {t.aboutText}
            </p>

            <p
              className={`mt-6 text-lg leading-8 ${
                isDark
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            >
              {t.aboutSecondText}
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-4">

              {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <motion.div
                    key={stat.label}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    className={`rounded-2xl border p-5 ${
                      isDark
                        ? "border-white/10 bg-white/[0.03]"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >

                    <Icon
                      size={20}
                      className="text-violet-500"
                    />

                    <p className="mt-3 text-2xl font-black">
                      {stat.value}
                    </p>

                    <p
                      className={`mt-1 text-sm ${
                        isDark
                          ? "text-gray-500"
                          : "text-gray-500"
                      }`}
                    >
                      {stat.label}
                    </p>

                  </motion.div>
                );
              })}

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default About;