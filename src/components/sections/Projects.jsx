import { ExternalLink, GitBranch } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

function Projects() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const projects = [
    {
      title: t.project1Title,
      description: t.project1Description,
      tech: "Laravel · Vue · AI",
    },
    {
      title: t.project2Title,
      description: t.project2Description,
      tech: "Java · MySQL",
    },
    {
      title: t.project3Title,
      description: t.project3Description,
      tech: "Flutter · Firebase",
    },
  ];

  return (
    <section
      id="projects"
      className={`border-t px-6 py-32 ${
        theme === "dark"
          ? "border-white/10"
          : "border-gray-200"
      }`}
    >
      <div className="mx-auto max-w-7xl">

        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
          {t.projectsLabel}
        </p>

        <h2 className="text-4xl font-bold sm:text-5xl">
          {t.projectsTitle}
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {projects.map((project) => (
            <article
              key={project.title}
              className={`group rounded-3xl border p-7 transition duration-300 hover:-translate-y-2 hover:border-violet-500/40 ${
                theme === "dark"
                  ? "border-white/10 bg-white/[0.03]"
                  : "border-gray-200 bg-gray-50"
              }`}
            >

              <div className="mb-8 flex h-48 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/10">
                <span className="text-5xl font-black text-violet-400">
                  {"</>"}
                </span>
              </div>

              <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                {project.tech}
              </p>

              <h3 className="mt-3 text-2xl font-bold">
                {project.title}
              </h3>

              <p
                className={`mt-4 leading-7 ${
                  theme === "dark"
                    ? "text-gray-400"
                    : "text-gray-600"
                }`}
              >
                {project.description}
              </p>

              <div className="mt-7 flex gap-3">

                <button
                  className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm transition hover:border-violet-500 hover:text-violet-500"
                >
                  <GitBranch size={16} />
                  GitHub
                </button>

                <button
                  className="flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm text-white transition hover:bg-violet-500"
                >
                  <ExternalLink size={16} />
                  Live
                </button>

              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Projects;