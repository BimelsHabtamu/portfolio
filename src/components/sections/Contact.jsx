import { Mail } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

function Contact() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <section
      id="contact"
      className={`border-t px-6 py-32 ${
        theme === "dark"
          ? "border-white/10"
          : "border-gray-200"
      }`}
    >
      <div className="mx-auto max-w-4xl text-center">

        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
          {t.contactLabel}
        </p>

        <h2 className="text-4xl font-bold sm:text-6xl">
          {t.contactTitle}
        </h2>

        <p
          className={`mx-auto mt-6 max-w-2xl text-lg leading-8 ${
            theme === "dark"
              ? "text-gray-400"
              : "text-gray-600"
          }`}
        >
          {t.contactText}
        </p>

        <a
          href="mailto:bimelshabtamu152@gmail.com"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-violet-600 px-8 py-4 font-semibold text-white transition hover:bg-violet-500"
        >
          <Mail size={18} />
          {t.getInTouch}
        </a>

      </div>
    </section>
  );
}

export default Contact;