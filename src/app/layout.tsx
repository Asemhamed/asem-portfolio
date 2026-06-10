"use client";
import "./globals.css";
import { useState, useEffect, createContext, useContext } from "react";

interface AppContextType {
  lang: "en" | "ar";
  setLang: (l: "en" | "ar") => void;
  theme: "dark" | "light";
  setTheme: (t: "dark" | "light") => void;
  activeSection: string;
  setActiveSection: (s: string) => void;
}

export const AppContext = createContext<AppContextType>({
  lang: "en", setLang: () => {},
  theme: "dark", setTheme: () => {},
  activeSection: "home", setActiveSection: () => {},
});

export const useApp = () => useContext(AppContext);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<"en" | "ar">("en");
  const [theme, setThemeState] = useState<"dark" | "light">("dark");
  const [activeSection, setActiveSection] = useState("home");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("portfolio-lang") as "en" | "ar" | null;
    const savedTheme = localStorage.getItem("portfolio-theme") as "dark" | "light" | null;
    if (savedLang) setLangState(savedLang);
    if (savedTheme) setThemeState(savedTheme);
    setMounted(true);
  }, []);

  const setLang = (l: "en" | "ar") => {
    setLangState(l);
    localStorage.setItem("portfolio-lang", l);
  };

  const setTheme = (t: "dark" | "light") => {
    setThemeState(t);
    localStorage.setItem("portfolio-theme", t);
  };

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.className = theme;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.body.className = `${lang === "ar" ? "rtl" : "ltr"} ${theme === "dark" ? "dark-mode" : ""}`;
  }, [lang, theme, mounted]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Asem Hamed – Frontend Developer</title>
        <meta name="description" content="Frontend Developer specializing in React & Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Inline script runs before React hydrates — no flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var lang = localStorage.getItem('portfolio-lang') || 'en';
                  var theme = localStorage.getItem('portfolio-theme') || 'dark';
                  document.documentElement.className = theme;
                  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
                  document.documentElement.lang = lang;
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <AppContext.Provider value={{ lang, setLang, theme, setTheme, activeSection, setActiveSection }}>
          <div style={{ visibility: mounted ? "visible" : "hidden" }}>
            {children}
          </div>
        </AppContext.Provider>
      </body>
    </html>
  );
}