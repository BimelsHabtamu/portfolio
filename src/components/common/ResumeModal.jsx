import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

function ResumeModal({ isOpen, onClose }) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === "dark";

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`fixed inset-4 z-[101] flex flex-col rounded-3xl border shadow-2xl sm:inset-8 lg:inset-16 ${
              isDark
                ? "border-white/10 bg-[#0f0f14]"
                : "border-gray-200 bg-white"
            }`}
          >
            {/* Header */}
            <div
              className={`flex shrink-0 items-center justify-between border-b px-6 py-4 ${
                isDark ? "border-white/10" : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                <span className="font-bold">
                  {t.resumeModalTitle || "Resume — Bimels Habtamu"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Open in new tab */}
                <a
                  href="/resume.html"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open in new tab"
                  className={`flex h-9 w-9 items-center justify-center rounded-full border transition hover:border-violet-500 hover:text-violet-400 ${
                    isDark
                      ? "border-white/10 text-gray-400"
                      : "border-gray-200 text-gray-500"
                  }`}
                >
                  <ExternalLink size={16} />
                </a>

                {/* Download */}
                <a
                  href="/resume.html"
                  download="Bimels-Habtamu-Resume.html"
                  aria-label="Download resume"
                  className="flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-500"
                >
                  <Download size={15} />
                  {t.downloadResume}
                </a>

                {/* Close */}
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className={`flex h-9 w-9 items-center justify-center rounded-full border transition hover:border-violet-500 hover:text-violet-400 ${
                    isDark
                      ? "border-white/10 text-gray-400"
                      : "border-gray-200 text-gray-500"
                  }`}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="relative min-h-0 flex-1">
              <iframe
                src="/resume.html"
                title="Resume"
                className="h-full w-full rounded-b-3xl"
                style={{ border: "none" }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ResumeModal;
