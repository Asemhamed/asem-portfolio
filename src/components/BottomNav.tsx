"use client";
import { useEffect, useRef } from "react";
import { useApp } from "@/app/layout";
import { gsap } from "gsap";
import { translations } from "@/libs/translations";

const sections = ["home","about","skills","projects","services","contact"];
const icons: Record<string,string> = {
  home: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  about: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  skills: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  projects: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
  services: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  contact: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
};

export default function BottomNav() {
  const { lang, theme, activeSection, setActiveSection } = useApp();
  const t = translations[lang];
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 1.2, ease: "power3.out" });
    }
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: "smooth" }); setActiveSection(id); }
  };

  const isDark = theme === "dark";
  return (
    <div ref={navRef} style={{ position:"fixed", bottom:"16px", left:"50%", transform:"translateX(-50%)", zIndex:50 }}>
      <nav style={{
        background: isDark ? "rgba(17,17,24,0.9)" : "rgba(255,255,255,0.9)",
        backdropFilter: "blur(20px)",
        border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
        borderRadius: "24px", padding: "8px 6px",
        display: "flex", gap: "2px",
        boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 8px 32px rgba(0,0,0,0.1)",
      }}>
        {sections.map(section => {
          const isActive = activeSection === section;
          return (
            <button key={section} onClick={() => scrollTo(section)} style={{
              display:"flex", flexDirection:"column", alignItems:"center", gap:"2px",
              padding:"8px 12px", borderRadius:"16px", border:"none", cursor:"pointer",
              transition:"all 0.25s ease",
              background: isActive ? "linear-gradient(135deg,rgba(0,229,255,0.15),rgba(255,107,53,0.1))" : "transparent",
              color: isActive ? "#00E5FF" : isDark ? "#555" : "#999",
              minWidth:"52px",
            }}>
              <span dangerouslySetInnerHTML={{ __html: icons[section] }} style={{ display:"flex", transform: isActive ? "scale(1.1)" : "scale(1)", transition:"transform 0.2s" }} />
              <span style={{ fontSize:"9px", fontWeight: isActive ? "700" : "400", fontFamily: lang==="ar" ? "'Cairo',sans-serif" : "'DM Sans',sans-serif", whiteSpace:"nowrap" }}>
                {t.nav[section as keyof typeof t.nav]}
              </span>
              {isActive && <span style={{ width:"3px", height:"3px", borderRadius:"50%", background:"#00E5FF" }} />}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
