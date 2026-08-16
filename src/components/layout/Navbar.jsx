import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";

import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();

  const [mobileMenu, setMobileMenu] = useState(false);

  const navItems = [
    { label: t.home, href: "#home" },
    { label: t.about, href: "#about" },
    { label: t.skills, href: "#skills" },
    { label: t.projects, href: "#projects" },
    { label: t.blog, href: "#blog" },
    { label: t.contact, href: "#contact" },
  ];

  const handleNavigation = () => {
    setMobileMenu(false);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        {/* Logo */}
        <a
          href="#home"
          className="text-2xl font-black tracking-tight"
          onClick={handleNavigation}
        >
          B<span className="text-violet-500">.</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition hover:text-violet-400"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Desktop Controls */}
        <div className="hidden items-center gap-3 md:flex">

          {/* Language */}
          <div className="flex overflow-hidden rounded-full border border-white/10">
            <button
              onClick={() => changeLanguage("en")}
              className={`px-3 py-1.5 text-xs font-semibold transition ${
                language === "en"
                  ? "bg-violet-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              EN
            </button>

            <button
              onClick={() => changeLanguage("am")}
              className={`px-3 py-1.5 text-xs font-semibold transition ${
                language === "am"
                  ? "bg-violet-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              አማ
            </button>
          </div>

          {/* Theme */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition hover:border-violet-500"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun size={17} />
            ) : (
              <Moon size={17} />
            )}
          </button>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 md:hidden"
          aria-label="Toggle navigation"
        >
          {mobileMenu ? <X size={20} /> : <Menu size={20} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="border-t border-white/10 bg-black/90 px-6 py-6 backdrop-blur-xl md:hidden">

          <div className="flex flex-col gap-5">

            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavigation}
                className="text-base font-medium transition hover:text-violet-400"
              >
                {item.label}
              </a>
            ))}

            <div className="mt-2 flex items-center gap-3 border-t border-white/10 pt-5">

              <button
                onClick={() => changeLanguage("en")}
                className={`rounded-full border px-4 py-2 text-xs font-semibold ${
                  language === "en"
                    ? "border-violet-500 text-violet-400"
                    : "border-white/10 text-gray-400"
                }`}
              >
                English
              </button>

              <button
                onClick={() => changeLanguage("am")}
                className={`rounded-full border px-4 py-2 text-xs font-semibold ${
                  language === "am"
                    ? "border-violet-500 text-violet-400"
                    : "border-white/10 text-gray-400"
                }`}
              >
                አማርኛ
              </button>

              <button
                onClick={toggleTheme}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10"
              >
                {theme === "dark" ? (
                  <Sun size={17} />
                ) : (
                  <Moon size={17} />
                )}
              </button>

            </div>

          </div>

        </div>
      )}
    </nav>
  );
}

export default Navbar;