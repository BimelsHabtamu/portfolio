import { motion } from "framer-motion";
import { Award, Briefcase, CalendarDays, GraduationCap } from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import experienceData from "../../data/experience";
import CertificateCarousel from "../common/CertificateCarousel";

const typeMeta = {
  education: {
    icon: GraduationCap,
  },
  experience: {
    icon: Briefcase,
  },
  certification: {
    icon: Award,
  },
};

function Experience() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="experience"
      className={`border-t px-6 py-32 ${
        isDark ? "border-white/10" : "border-gray-200"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-500">
            {t.experienceLabel}
          </p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            {t.experienceTitle}
          </h2>
          <p
            className={`mt-6 text-lg leading-8 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t.experienceDescription}
          </p>
        </motion.div>

        <div className="relative mt-16">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-violet-500/20 md:block" />

          <div className="space-y-8">
            {experienceData.map((item, index) => {
              const Icon = typeMeta[item.type]?.icon || Briefcase;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="relative md:pl-16"
                >
                  <div className="absolute left-0 top-7 hidden h-5 w-5 items-center justify-center rounded-full border-4 border-[#08080c] bg-violet-500 md:flex" />

                  <div
                    className={`rounded-3xl border p-7 transition duration-300 hover:-translate-y-1 ${
                      isDark
                        ? "border-white/10 bg-white/[0.03] hover:border-violet-500/30"
                        : "border-gray-200 bg-gray-50 hover:border-violet-300"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-500">
                        <Icon size={13} />
                        {t[item.type]}
                      </span>

                      <span
                        className={`flex items-center gap-1.5 text-xs ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        <CalendarDays size={13} />
                        {item.period[language]}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-black sm:text-2xl">
                      {item.title[language]}
                    </h3>

                    <p className="mt-2 font-semibold text-violet-500">
                      {item.organization[language]}
                    </p>

                    <p
                      className={`mt-5 leading-7 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {item.description[language]}
                    </p>

                    {/* Certificate image carousel — only on certification cards */}
                    {item.type === "certification" && (
                      <CertificateCarousel />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
