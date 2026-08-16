import { useState } from "react";
import { ChevronLeft, ChevronRight, Award, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import certificates from "../../data/certificates";

function CertificateCarousel() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const total = certificates.length;

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + total) % total);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % total);
  };

  const goTo = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  // ── Empty state — no certificates yet ──────────────────────────
  if (total === 0) {
    return (
      <div
        className={`mt-6 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed py-14 text-center ${
          isDark
            ? "border-white/10 bg-white/[0.02]"
            : "border-gray-200 bg-gray-50"
        }`}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-500/10">
          <Award size={28} className="text-violet-500" />
        </span>
        <p className="font-semibold text-violet-500">
          {language === "am" ? "ሰርተፊኬቶች በቅርቡ ይጨመራሉ" : "Certificates coming soon"}
        </p>
        <p
          className={`max-w-xs text-sm leading-6 ${
            isDark ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {language === "am"
            ? "ሰርተፊኬቶቼን ስጨርስ እዚህ ይታያሉ።"
            : "Once I earn certificates, they will appear here."}
        </p>
      </div>
    );
  }

  // ── Carousel ────────────────────────────────────────────────────
  const cert = certificates[current];

  return (
    <div className="mt-6 select-none">

      {/* Card */}
      <div
        className={`relative overflow-hidden rounded-2xl border ${
          isDark
            ? "border-white/10 bg-white/[0.03]"
            : "border-gray-200 bg-gray-50"
        }`}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="p-6"
          >
            {/* Certificate image */}
            {cert.image ? (
              <div className="rounded-xl overflow-hidden flex items-center justify-center bg-white">
                <img
                  src={cert.image}
                  alt={cert.title[language]}
                  className="w-full h-auto max-h-[480px] object-contain"
                  loading="lazy"
                />
              </div>
            ) : (
              /* Placeholder if image not set yet */
              <div
                className={`flex h-56 items-center justify-center rounded-xl sm:h-72 ${
                  isDark ? "bg-white/5" : "bg-gray-100"
                }`}
              >
                <Award size={48} className="text-violet-500/40" />
              </div>
            )}

            {/* Info */}
            <div className="mt-5">
              <h4 className="text-lg font-black sm:text-xl">
                {cert.title[language]}
              </h4>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-violet-500">
                  {cert.issuer[language]}
                </span>
                <span
                  className={`text-xs ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  {cert.date[language]}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Left arrow */}
        {total > 1 && (
          <button
            onClick={prev}
            aria-label="Previous certificate"
            className={`absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border shadow-lg transition hover:border-violet-500 hover:text-violet-400 ${
              isDark
                ? "border-white/10 bg-black/60 text-white"
                : "border-gray-200 bg-white text-gray-700"
            }`}
          >
            <ChevronLeft size={18} />
          </button>
        )}

        {/* Right arrow */}
        {total > 1 && (
          <button
            onClick={next}
            aria-label="Next certificate"
            className={`absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border shadow-lg transition hover:border-violet-500 hover:text-violet-400 ${
              isDark
                ? "border-white/10 bg-black/60 text-white"
                : "border-gray-200 bg-white text-gray-700"
            }`}
          >
            <ChevronRight size={18} />
          </button>
        )}
      </div>

      {/* Dot indicators */}
      {total > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {certificates.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to certificate ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 bg-violet-500"
                  : isDark
                  ? "w-2 bg-white/20 hover:bg-white/40"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      {total > 1 && (
        <p
          className={`mt-3 text-center text-xs ${
            isDark ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {current + 1} / {total}
        </p>
      )}
    </div>
  );
}

export default CertificateCarousel;
