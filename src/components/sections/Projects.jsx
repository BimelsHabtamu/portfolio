import { ExternalLink, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

const projects = [
  {
    id: 1,
    title: { en: "EthioFarmer Advisor", am: "EthioFarmer Advisor" },
    description: {
      en: "An AI-powered agricultural advisory platform that helps Ethiopian farmers get smart crop recommendations, weather insights, and farming guidance in their local language.",
      am: "የኢትዮጵያ ገበሬዎችን ብልጥ የሰብል ምክሮች፣ የአየር ሁኔታ ትንታኔ እና የእርሻ መምሪያ በአካባቢ ቋንቋ ለማቅረብ የሚያስችል AI-powered ስርዓት።",
    },
    tech: ["Python", "Streamlit", "AI/ML"],
    github: "https://github.com/BimelsHabtamu/ethiofarmer-advisor",
    live: "https://ethiofarmer-advisor.streamlit.app/",
  },
  {
    id: 2,
    title: { en: "Search Engine", am: "Search Engine" },
    description: {
      en: "A custom-built search engine that crawls, indexes, and ranks web content — built from scratch to understand the fundamentals of information retrieval.",
      am: "የድር ይዘቶችን የሚቃኝ፣ የሚያዘጋጅ እና የሚቀድም custom-built search engine — የመረጃ ፍለጋ መሰረቶችን ለመረዳት ከዜሮ የተሰራ።",
    },
    tech: ["Python", "Information Retrieval"],
    github: "https://github.com/BimelsHabtamu/Search-Engine",
    live: null,
  },
  {
    id: 3,
    title: { en: "Digital Hotel Reservation System", am: "Digital Hotel Reservation System" },
    description: {
      en: "A full-featured hotel reservation platform with room booking, availability management, guest management, and admin dashboard.",
      am: "የክፍል ቦታ ማስያዝ፣ የተገኝነት አስተዳደር፣ የእንግዳ አስተዳደር እና የአስተዳዳሪ ዳሽቦርድ ያለው ሙሉ የሆቴል ቦታ ማስያዝ ስርዓት።",
    },
    tech: ["Laravel", "PHP", "MySQL"],
    github: "https://github.com/BimelsHabtamu/Digital-Hotel-Reservation-System",
    live: null,
  },
];

function Projects() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="projects"
      className={`border-t px-6 py-32 ${isDark ? "border-white/10" : "border-gray-200"}`}
    >
      <div className="mx-auto max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
            {t.projectsLabel}
          </p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            {t.projectsTitle}
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group flex flex-col rounded-3xl border p-7 transition duration-300 hover:-translate-y-2 hover:border-violet-500/40 ${
                isDark
                  ? "border-white/10 bg-white/[0.03]"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              {/* Card header visual */}
              <div className="mb-6 flex h-40 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/10">
                <span className="text-4xl font-black text-violet-400">&lt;/&gt;</span>
              </div>

              {/* Tech tags */}
              <div className="mb-3 flex flex-wrap gap-2">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-xl font-black leading-tight">
                {project.title[language] || project.title.en}
              </h3>

              {/* Description */}
              <p className={`mt-3 flex-1 text-sm leading-7 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {project.description[language] || project.description.en}
              </p>

              {/* Links */}
              <div className="mt-6 flex gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition hover:border-violet-500 hover:text-violet-400 ${
                    isDark ? "border-white/15" : "border-gray-300"
                  }`}
                >
                  <GitBranch size={15} />
                  GitHub
                </a>

                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500"
                  >
                    <ExternalLink size={15} />
                    Live
                  </a>
                ) : (
                  <span className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium opacity-40 ${isDark ? "border-white/10" : "border-gray-200"}`}>
                    <ExternalLink size={15} />
                    {language === "am" ? "በቅርቡ" : "Coming Soon"}
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Projects;
