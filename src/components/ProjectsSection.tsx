"use client";
import { useEffect, useRef } from "react";
import { useApp } from "@/app/layout";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import { translations } from "@/libs/translations";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const { lang, theme } = useApp();
  const t = translations[lang];
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLElement>(null);
  const ff = lang === "ar" ? "'Cairo',sans-serif" : "'DM Sans',sans-serif";
  const titleFont = lang === "ar" ? "'Cairo',sans-serif" : "'Syne',sans-serif";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".projects-title", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".projects-title", start: "top 80%" },
      });
      gsap.fromTo(".project-card", { opacity: 0, y: 50, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".project-card", start: "top 85%" },
      });
      gsap.fromTo(".github-cta", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: ".github-cta", start: "top 90%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        padding: "100px 24px 120px",
        background: isDark
          ? "linear-gradient(180deg, #0A0A0F 0%, #0D0D18 60%, #0A0A0F 100%)"
          : "linear-gradient(180deg, #F8F7F4 0%, #F0EEE8 60%, #F8F7F4 100%)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div className="projects-title" style={{ marginBottom: "60px", textAlign: lang === "ar" ? "right" : "left" }}>
          <p style={{
            fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase",
            color: "#00E5FF", fontWeight: "600", fontFamily: ff, marginBottom: "8px",
          }}>
            {t.projects.subtitle}
          </p>
          <h2 style={{
            fontSize: "clamp(36px,5vw,58px)", fontWeight: "800",
            fontFamily: titleFont, color: isDark ? "#fff" : "#0A0A0F", lineHeight: 1.1,
          }}>
            {t.projects.title}
          </h2>
        </div>

        {/* Responsive grid: 3 cols desktop → 2 cols tablet → 1 col mobile */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
          className="projects-grid"
        >
          {t.projects.items.map((project: any, i: number) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="github-cta" style={{ marginTop: "48px", textAlign: "center", opacity: 0 }}>
          <a
            href="https://github.com/Asemhamed"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "12px",
              padding: "16px 32px", borderRadius: "16px",
              background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
              color: isDark ? "#bbb" : "#444",
              fontSize: "15px", fontWeight: "600",
              textDecoration: "none", fontFamily: ff,
              transition: "all 0.25s",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(0,229,255,0.35)";
              el.style.color = "#00E5FF";
              el.style.background = "rgba(0,229,255,0.06)";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
              el.style.color = isDark ? "#bbb" : "#444";
              el.style.background = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
              el.style.transform = "";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            {t.projects.viewAll}
            <span style={{ opacity: 0.5 }}>→</span>
          </a>
        </div>
      </div>

      {/* Responsive grid CSS */}
      <style>{`
        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}