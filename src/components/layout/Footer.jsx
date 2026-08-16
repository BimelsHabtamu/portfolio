import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

function Footer() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <footer
      className={`border-t px-6 py-8 ${
        theme === "dark"
          ? "border-white/10"
          : "border-gray-200"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm sm:flex-row ${
          theme === "dark"
            ? "text-gray-500"
            : "text-gray-600"
        }`}
      >
        <p>
          © {new Date().getFullYear()} Bimels Habtamu.{" "}
          {t.footerRights}
        </p>

        <p>{t.builtWith}</p>
      </div>
    </footer>
  );
}

export default Footer;