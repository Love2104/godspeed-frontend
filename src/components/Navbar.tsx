import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "Product", href: "#product" },
  { name: "Team", href: "#team" },
  { name: "About", href: "#about" },
  { name: "Pricing", href: "#pricing" },
  { name: "Sign In / Register", href: "/auth" }, // Combined auth link
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("#hero");
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const navigate = useNavigate();
  const location = useLocation();

  // Highlight the correct nav link for /auth route
  useEffect(() => {
    if (location.pathname === "/auth") {
      setActive("/auth");
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      let found = false;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        if (navLinks[i].href.startsWith("#")) {
          const section = document.querySelector(navLinks[i].href);
          if (section) {
            const rect = (section as HTMLElement).getBoundingClientRect();
            if (rect.top <= 80) {
              setActive(navLinks[i].href);
              found = true;
              break;
            }
          }
        }
      }
      if (!found && location.pathname === "/") setActive("#hero");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Handles both scroll and route navigation
  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setMenuOpen(false);

    if (href.startsWith("#")) {
      setActive(href);
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      // If on a different route, navigate home first then scroll
      if (location.pathname !== "/") {
        navigate("/", { replace: true });
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }, 100); // Wait for page to render
      }
    } else {
      setActive(href);
      navigate(href);
    }
  };

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300
        ${scrolled ? "bg-white/90 shadow-lg backdrop-blur dark:bg-gray-900/90" : "bg-transparent"}
      `}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        <div className="font-extrabold text-2xl text-blue-600 dark:text-blue-400 tracking-tight select-none flex items-center gap-2">
          <span role="img" aria-label="rocket">🚀</span>
          Godspeed{" "}
          <span className="hidden sm:inline font-light text-base text-gray-500 dark:text-gray-300 ml-2">
            Landing Platform
          </span>
        </div>
        <ul className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.href} className="relative group">
              <button
                className={`px-3 py-2 font-medium transition text-lg
                  ${
                    active === link.href
                      ? "text-blue-700 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                  }
                `}
                onClick={e => handleNavClick(link.href, e)}
              >
                {link.name}
                <span
                  className={`block h-0.5 rounded transition-all duration-300
                    ${
                      active === link.href
                        ? "w-full bg-blue-600 dark:bg-blue-400 mt-1"
                        : "w-0 bg-blue-600 dark:bg-blue-400 group-hover:w-full mt-1"
                    }
                  `}
                ></span>
              </button>
            </li>
          ))}
        </ul>
        <button
          className="ml-4 mr-2 text-2xl focus:outline-none transition"
          onClick={() => setDarkMode((d) => !d)}
          aria-label="Toggle dark mode"
          title="Toggle dark mode"
        >
          {darkMode ? (
            <span role="img" aria-label="Light">🌞</span>
          ) : (
            <span role="img" aria-label="Dark">🌙</span>
          )}
        </button>
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative group"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-blue-600 dark:bg-blue-300 rounded transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-blue-600 dark:bg-blue-300 rounded my-1 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-blue-600 dark:bg-blue-300 rounded transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
          ></span>
        </button>
      </div>
      {menuOpen && (
        <ul className="md:hidden bg-white dark:bg-gray-900 shadow-lg px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                className={`block w-full text-left px-3 py-2 rounded transition
                  ${
                    active === link.href
                      ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold"
                      : "hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200"
                  }
                `}
                onClick={e => handleNavClick(link.href, e)}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
