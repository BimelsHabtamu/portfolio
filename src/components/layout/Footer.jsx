import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { SocialRow } from "../common/SocialLinks";

function Footer() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer
      className={`border-t px-6 py-8 ${
        isDark ? "border-white/10" : "border-gray-200"
      }`}
    >
      <div className="mx-auto max-w-7xl space-y-5">
        {/* Social icons row */}
        <div className="flex justify-center">
          <SocialRow />
        </div>

        {/* Bottom line */}
        <div
          className={`flex flex-col items-center justify-between gap-2 text-sm sm:flex-row ${
            isDark ? "text-gray-500" : "text-gray-500"
          }`}
        >
          <p>
            © {new Date().getFullYear()} Bimels Habtamu. {t.footerRights}
          </p>
          <p>{t.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;