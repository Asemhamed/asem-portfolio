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
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    document.documentElement.className = theme;
    document.body.className = `${lang === "ar" ? "rtl" : "ltr"} ${theme === "dark" ? "dark-mode" : ""}`;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang, theme]);

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} className={theme}>
      <head>
        <title>Asem Hamed – Frontend Developer</title>
        <meta name="description" content="Frontend Developer specializing in React & Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <AppContext.Provider value={{ lang, setLang, theme, setTheme, activeSection, setActiveSection }}>
          {children}
        </AppContext.Provider>
      </body>
    </html>
  );
}
