import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

const translations = {
  en: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact",

    hello: "Hello, I'm Bimels 👋",
    role: "Full Stack Developer",

    heroDescription:
      "I build modern web applications, intelligent digital experiences, and practical solutions that turn ideas into real products.",

    viewWork: "View My Work",
    downloadResume: "Download Resume",

    github: "GitHub",
    linkedin: "LinkedIn",
    telegram: "Telegram",

    aboutLabel: "About Me",
    aboutTitle: "Building technology with purpose.",
    aboutText:
      "I'm a developer passionate about creating useful software, solving real-world problems, and continuously learning modern technologies.",
    aboutSecondText:
      "I enjoy turning complex ideas into simple, scalable, and user-friendly digital products. My focus is on building applications that are not only functional, but also fast, accessible, and enjoyable to use.",
    yearsLearning: "Years Learning",
    technologies: "Technologies",
    curiosity: "Curiosity",
    technicalExpertise: "Technical expertise",
    howIBuild: "How I build",
    howIBuildText:
      "Clean architecture, reusable components, responsive interfaces, maintainable code, and continuous improvement.",

    skillsLabel: "Skills",
    skillsTitle: "Technologies I work with.",

    experienceLabel: "My Journey",
    experienceTitle: "Education, experience & growth.",
    experienceDescription:
      "A timeline of my academic journey, development experience, and continuous learning.",
    education: "Education",
    experience: "Experience",
    certification: "Certification",

    projectsLabel: "Selected Work",
    projectsTitle: "Projects I'm proud of.",

    project1Title: "Skill Match Job Recommender",
    project1Description:
      "A job recommendation system that analyzes resumes, identifies skills, detects gaps, and helps users discover relevant opportunities.",

    project2Title: "QR Attendance System",
    project2Description:
      "A digital attendance management solution designed to simplify student attendance tracking and reporting.",

    project3Title: "Digital Notice Board",
    project3Description:
      "A modern platform for publishing and managing university announcements digitally.",

    blogLabel: "Blog",
    blogTitle: "Thoughts, tutorials & insights.",
    blogText:
      "I write about software development, web technologies, AI, projects, lessons learned, and my journey as a developer.",
    comingSoon: "Coming Soon",

    contactLabel: "Contact",
    contactTitle: "Let's build something great.",
    contactText:
      "Have an idea, project, opportunity, or simply want to connect? I'd love to hear from you.",
    getInTouch: "Get In Touch",

    footerRights: "All rights reserved.",
    builtWith: "Built with React.js",
  },

  am: {
    home: "መነሻ",
    about: "ስለ እኔ",
    skills: "ክህሎቶች",
    projects: "ፕሮጀክቶች",
    blog: "ብሎግ",
    contact: "ያግኙኝ",

    hello: "ሰላም፣ እኔ Bimels ነኝ 👋",
    role: "Full Stack Developer",

    heroDescription:
      "ዘመናዊ የድር መተግበሪያዎችን፣ የAI ቴክኖሎጂዎችን እና ተግባራዊ ዲጂታል መፍትሄዎችን እገነባለሁ።",

    viewWork: "ስራዎቼን ይመልከቱ",
    downloadResume: "CV አውርድ",

    github: "GitHub",
    linkedin: "LinkedIn",
    telegram: "Telegram",

    aboutLabel: "ስለ እኔ",
    aboutTitle: "ቴክኖሎጂን በዓላማ እገነባለሁ።",
    aboutText:
      "ጠቃሚ ሶፍትዌሮችን መፍጠር፣ የእውነተኛ ዓለም ችግሮችን መፍታት እና ዘመናዊ ቴክኖሎጂዎችን በቀጣይነት መማር የምወድ ዴቨሎፐር ነኝ።",
    aboutSecondText:
      "ውስብስብ ሀሳቦችን ወደ ቀላል፣ ሊሰፋ የሚችል እና ለተጠቃሚ ምቹ ዲጂታል ምርቶች መቀየር እወዳለሁ። የምገነባቸው መተግበሪያዎች ተግባራዊ ብቻ ሳይሆኑ ፈጣን፣ ተደራሽ እና ለመጠቀም አስደሳች እንዲሆኑ እሰራለሁ።",
    yearsLearning: "የመማር ዓመታት",
    technologies: "ቴክኖሎጂዎች",
    curiosity: "የመማር ጉጉት",
    technicalExpertise: "የቴክኒክ እውቀት",
    howIBuild: "እንዴት እገነባለሁ",
    howIBuildText:
      "ንጹህ አርክቴክቸር፣ እንደገና ሊጠቀሙባቸው የሚችሉ components፣ responsive interfaces፣ ቀላል ለመጠገን የሚችል code እና ቀጣይነት ያለው ማሻሻያ።",

    skillsLabel: "ክህሎቶች",
    skillsTitle: "የምጠቀምባቸው ቴክኖሎጂዎች።",

    experienceLabel: "የእኔ ጉዞ",
    experienceTitle: "ትምህርት፣ ልምድ እና እድገት።",
    experienceDescription:
      "የትምህርት ጉዞዬን፣ የdevelopment ልምዴን እና ቀጣይነት ያለውን የመማር ሂደቴን የሚያሳይ timeline።",
    education: "ትምህርት",
    experience: "የስራ ልምድ",
    certification: "ሰርተፊኬት",

    projectsLabel: "የተመረጡ ስራዎች",
    projectsTitle: "የምኮራባቸው ፕሮጀክቶች።",

    project1Title: "Skill Match Job Recommender",
    project1Description:
      "የስራ ፈላጊዎችን CV የሚተነትን፣ ክህሎቶችን የሚለይ፣ የክህሎት ክፍተቶችን የሚያሳይ እና ተስማሚ የስራ እድሎችን የሚያሳይ የስራ ምክረ ስርዓት ነው።",

    project2Title: "QR Attendance System",
    project2Description:
      "የተማሪዎችን የመገኘት መረጃ በቀላሉ ለመመዝገብ፣ ለመከታተል እና ሪፖርት ለማዘጋጀት የተሰራ ዲጂታል የክትትል ስርዓት ነው።",

    project3Title: "Digital Notice Board",
    project3Description:
      "የዩኒቨርሲቲ ማስታወቂያዎችን በዲጂታል መንገድ ለማተም እና ለማስተዳደር የተሰራ ዘመናዊ መድረክ ነው።",

    blogLabel: "ብሎግ",
    blogTitle: "ሀሳቦች፣ ትምህርቶች እና ልምዶች።",
    blogText:
      "ስለ ሶፍትዌር ልማት፣ የድር ቴክኖሎጂዎች፣ AI፣ ፕሮጀክቶች እና ከልምዴ የምማራቸውን ነገሮች እጽፋለሁ።",
    comingSoon: "በቅርቡ ይመጣል",

    contactLabel: "ያግኙኝ",
    contactTitle: "አብረን ጥሩ ነገር እንገንባ።",
    contactText:
      "ሀሳብ፣ ፕሮጀክት፣ የስራ እድል ካለዎት ወይም በቀላሉ መገናኘት ከፈለጉ እኔን ማግኘት ይችላሉ።",

    getInTouch: "ያግኙኝ",

    footerRights: "መብቱ የተጠበቀ ነው።",
    builtWith: "በ React.js የተሰራ",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("portfolio-language") || "en";
  });

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("portfolio-language", newLanguage);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}