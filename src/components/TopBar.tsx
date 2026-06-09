"use client";
import { useApp } from "@/app/layout";

export default function TopBar() {
  const { lang, setLang, theme, setTheme } = useApp();
  const isDark = theme === "dark";

  return (
    <div style={{
      position: "fixed",
      top: "16px",
      right: lang === "ar" ? "auto" : "16px",
      left: lang === "ar" ? "16px" : "auto",
      zIndex: 50,
      display: "flex",
      gap: "8px",
      alignItems: "center",
    }}>
      {/* Language toggle */}
      <button
        onClick={() => setLang(lang === "en" ? "ar" : "en")}
        style={{
          background: isDark ? "rgba(17,17,24,0.85)" : "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
          borderRadius: "12px",
          padding: "8px 14px",
          cursor: "pointer",
          color: isDark ? "#ccc" : "#333",
          fontSize: "13px",
          fontWeight: "600",
          fontFamily: "'DM Sans', sans-serif",
          transition: "all 0.2s",
        }}
      >
        {lang === "en" ? "عربي" : "EN"}
      </button>

      {/* Theme toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        style={{
          background: isDark ? "rgba(17,17,24,0.85)" : "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
          borderRadius: "12px",
          padding: "8px 10px",
          cursor: "pointer",
          color: isDark ? "#ccc" : "#333",
          fontSize: "16px",
          transition: "all 0.2s",
          lineHeight: 1,
        }}
        aria-label="Toggle theme"
      >
        {isDark ? "☀️" : "🌙"}
      </button>
    </div>
  );
}
