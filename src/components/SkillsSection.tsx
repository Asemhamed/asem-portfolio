"use client";
import { useEffect, useRef } from "react";
import { useApp } from "@/app/layout";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { translations } from "@/libs/translations";

gsap.registerPlugin(ScrollTrigger);

const skillsData = {
  languages: ["HTML5", "CSS3", "JavaScript", "TypeScript"],
  frameworks: ["React.js", "Next.js", "Redux Toolkit", "TanStack Query", "React Query"],
  styling: ["Tailwind CSS", "Shadcn UI", "Material UI", "Responsive Design", "FontAwesome"],
  forms: ["React Hook Form", "Zod"],
  tools: ["Git", "GitHub", "Axios", "Vercel"],
};

const categoryColors: Record<string, string> = {
  languages: "#00E5FF",
  frameworks: "#FF6B35",
  styling: "#A855F7",
  forms: "#22C55E",
  tools: "#F59E0B",
};

export default function SkillsSection() {
  const { lang, theme } = useApp();
  const t = translations[lang];
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLElement>(null);
  const ff = lang === "ar" ? "'Cairo',sans-serif" : "'DM Sans',sans-serif";
  const titleFont = lang === "ar" ? "'Cairo',sans-serif" : "'Syne',sans-serif";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".skills-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".skills-title", start: "top 80%" } });
      gsap.fromTo(".skill-category", { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: ".skill-category", start: "top 82%" } });
      gsap.fromTo(".skill-tag", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.04, ease: "back.out(1.7)", scrollTrigger: { trigger: ".skill-tag", start: "top 85%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} style={{
      minHeight: "100vh", padding: "100px 24px 120px",
      background: isDark
        ? "linear-gradient(180deg, #0A0A0F 0%, #0D0D18 50%, #0A0A0F 100%)"
        : "linear-gradient(180deg, #F8F7F4 0%, #F0EEE8 50%, #F8F7F4 100%)",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="skills-title" style={{ marginBottom: "60px", textAlign: lang === "ar" ? "right" : "left" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#00E5FF", fontWeight: "600", fontFamily: ff, marginBottom: "8px" }}>
            {t.skills.subtitle}
          </p>
          <h2 style={{ fontSize: "clamp(36px,5vw,58px)", fontWeight: "800", fontFamily: titleFont, color: isDark ? "#fff" : "#0A0A0F", lineHeight: 1.1 }}>
            {t.skills.title}
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {Object.entries(skillsData).map(([category, skills]) => {
            const color = categoryColors[category];
            const catLabel = t.skills.categories[category as keyof typeof t.skills.categories];
            return (
              <div key={category} className="skill-category" style={{
                background: isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.025)",
                border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                borderRadius: "20px", padding: "24px",
                opacity: 0,
                transition: "all 0.3s",
                position: "relative", overflow: "hidden",
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = `1px solid ${color}33`;
                  el.style.background = isDark ? `rgba(255,255,255,0.04)` : `rgba(0,0,0,0.04)`;
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = `0 12px 40px ${color}15`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)";
                  el.style.background = isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.025)";
                  el.style.transform = "";
                  el.style.boxShadow = "";
                }}
              >
                {/* Category accent line */}
                <div style={{ position: "absolute", top: 0, left: lang === "ar" ? "auto" : 0, right: lang === "ar" ? 0 : "auto", width: "3px", height: "100%", background: `linear-gradient(180deg, ${color}, transparent)`, borderRadius: "2px" }} />

                <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: color, fontWeight: "700", fontFamily: ff, marginBottom: "16px" }}>
                  {catLabel}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {skills.map(skill => (
                    <span key={skill} className="skill-tag" style={{
                      padding: "6px 14px", borderRadius: "8px",
                      background: `${color}12`,
                      border: `1px solid ${color}25`,
                      color: isDark ? "#ddd" : "#333",
                      fontSize: "13px", fontWeight: "500",
                      fontFamily: "'DM Sans', sans-serif",
                      opacity: 0,
                      transition: "all 0.2s",
                      cursor: "default",
                    }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = `${color}22`;
                        el.style.color = color;
                        el.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = `${color}12`;
                        el.style.color = isDark ? "#ddd" : "#333";
                        el.style.transform = "";
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
