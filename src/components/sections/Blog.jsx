import { ArrowRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

function Blog() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <section
      id="blog"
      className={`border-t px-6 py-32 ${
        theme === "dark"
          ? "border-white/10"
          : "border-gray-200"
      }`}
    >
      <div className="mx-auto max-w-7xl">

        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
          {t.blogLabel}
        </p>

        <h2 className="text-4xl font-bold sm:text-5xl">
          {t.blogTitle}
        </h2>

        <p
          className={`mt-6 max-w-2xl text-lg leading-8 ${
            theme === "dark"
              ? "text-gray-400"
              : "text-gray-600"
          }`}
        >
          {t.blogText}
        </p>

        <div className="mt-10">

          <button className="group flex items-center gap-2 rounded-full border border-violet-500 px-6 py-3 font-semibold text-violet-500 transition hover:bg-violet-500 hover:text-white">
            {t.comingSoon}

            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />
          </button>

        </div>

      </div>
    </section>
  );
}

export default Blog;