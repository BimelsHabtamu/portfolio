import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Send,
} from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { SocialGrid } from "../common/SocialLinks";

function Contact() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section
      id="contact"
      className={`border-t px-6 py-32 ${
        isDark ? "border-white/10" : "border-gray-200"
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-500">
            {t.contactLabel}
          </p>

          <h2 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            {t.contactTitle}
          </h2>

          <p
            className={`mx-auto mt-6 max-w-2xl text-lg leading-8 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t.contactDescription}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className={`rounded-[2rem] border p-8 ${
              isDark
                ? "border-white/10 bg-white/[0.03]"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-500">
              {t.letsConnect}
            </p>

            <h3 className="mt-6 text-3xl font-black">
              {t.contactTitle}
            </h3>

            <p
              className={`mt-5 leading-7 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {t.contactSideText}
            </p>

            <div className="mt-8">
              <p className={`mb-5 text-sm font-semibold uppercase tracking-[0.2em] ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                Find me on
              </p>
              <SocialGrid />
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className={`rounded-[2rem] border p-8 ${
              isDark
                ? "border-white/10 bg-white/[0.03]"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className="grid gap-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-violet-500">
                  {t.name}
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t.namePlaceholder}
                  className={`w-full rounded-2xl border px-4 py-3.5 outline-none transition focus:border-violet-500 ${
                    isDark
                      ? "border-white/10 bg-[#0d0d14] text-white placeholder:text-gray-500"
                      : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400"
                  }`}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-violet-500">
                  {t.email}
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t.emailPlaceholder}
                  className={`w-full rounded-2xl border px-4 py-3.5 outline-none transition focus:border-violet-500 ${
                    isDark
                      ? "border-white/10 bg-[#0d0d14] text-white placeholder:text-gray-500"
                      : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400"
                  }`}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-violet-500">
                  {t.message}
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t.messagePlaceholder}
                  rows={6}
                  className={`w-full rounded-2xl border px-4 py-3.5 outline-none transition focus:border-violet-500 ${
                    isDark
                      ? "border-white/10 bg-[#0d0d14] text-white placeholder:text-gray-500"
                      : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400"
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500"
            >
              <Send size={18} />
              {t.sendMessage}
            </button>

            {status === "success" && (
              <div className="mt-5 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
                <CheckCircle2 size={18} />
                {t.messageSuccess}
              </div>
            )}

            {status === "error" && (
              <div className="mt-5 flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                <AlertCircle size={18} />
                {t.messageError}
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default Contact;