import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import AutoSkillList from "../common/AutoSkillList";

const skills = [
  "React",
  "JavaScript",
  "Laravel",
  "PHP",
  "MySQL",
  "Git",
];

function Skills() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <section
      id="skills"
      className={`border-t px-6 py-32 ${
        theme === "dark"
          ? "border-white/10"
          : "border-gray-200"
      }`}
    >
      <div className="mx-auto max-w-7xl">

        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
          {t.skillsLabel}
        </p>

        <h2 className="text-4xl font-bold sm:text-5xl">
          {t.skillsTitle}
        </h2>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <AutoSkillList />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {skills.map((skill) => (
              <div
                key={skill}
                className={`rounded-2xl border p-6 text-center transition hover:-translate-y-1 hover:border-violet-500/50 ${
                  theme === "dark"
                    ? "border-white/10 bg-white/[0.03]"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Skills;