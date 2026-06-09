"use client";
import { useEffect, useRef } from "react";
import { useApp } from "@/app/layout";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "FreshCart",
    titleAr: "فريش كارت",
    descEn: "A high-performance e-commerce SPA with multi-step checkout, Stripe payments, cart/wishlist management, advanced filtering, and real-time order tracking.",
    descAr: "تطبيق تجارة إلكترونية عالي الأداء مع checkout متعدد الخطوات، دفع بـ Stripe، إدارة العربة والمفضلة، فلترة متقدمة وتتبع الطلبات.",
    stack: ["Next.js", "TypeScript", "Redux Toolkit", "TanStack Query", "Tailwind CSS", "Zod", "Vercel"],
    color: "#00E5FF",
    icon: "🛒",
    github: "https://github.com/Asemhamed",
    live: "https://ecommerce-ten-chi-57.vercel.app",
    year: "2026",
  },
  {
    title: "Social Media App",
    titleAr: "تطبيق سوشيال ميديا",
    descEn: "A full-featured social platform with authentication, posts, likes, comments, shares, real-time UI updates, notifications filtering, and responsive design.",
    descAr: "منصة اجتماعية متكاملة مع المصادقة، المنشورات، الإعجابات، التعليقات، المشاركات، تحديثات UI الفورية وتصميم متجاوب.",
    stack: ["React.js", "Tailwind CSS", "TanStack Query", "Axios", "Context API", "React Hook Form", "Zod"],
    color: "#00E5FF",
    icon: "💬",
    github: "https://github.com/Asemhamed",
    live: "https://social-app-eight-olive.vercel.app",
    year: "2026",
  },
];

export default function ProjectsSection() {
  const { lang, theme } = useApp();
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
        opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.18, ease: "power3.out",
        scrollTrigger: { trigger: ".project-card", start: "top 82%" },
      });
      gsap.fromTo(".github-cta", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: ".github-cta", start: "top 88%" },
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
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div className="projects-title" style={{ marginBottom: "64px", textAlign: lang === "ar" ? "right" : "left" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#00E5FF", fontWeight: "600", fontFamily: ff, marginBottom: "8px" }}>
            {lang === "ar" ? "ما بنيته" : "What I've built"}
          </p>
          <h2 style={{ fontSize: "clamp(36px,5vw,58px)", fontWeight: "800", fontFamily: titleFont, color: isDark ? "#fff" : "#0A0A0F", lineHeight: 1.1 }}>
            {lang === "ar" ? "المشاريع" : "Projects"}
          </h2>
        </div>

        {/* Project cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {projects.map((project, i) => (
            <div
              key={i}
              className="project-card"
              style={{
                opacity: 0,
                background: isDark ? "rgba(255,255,255,0.025)" : "#fff",
                border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                borderRadius: "24px",
                padding: "36px",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.35s ease",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = `1px solid ${project.color}35`;
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = `0 20px 60px ${project.color}12`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)";
                el.style.transform = "";
                el.style.boxShadow = "";
              }}
            >
              {/* Background orb */}
              <div style={{
                position: "absolute",
                top: "-60px",
                right: lang === "ar" ? "auto" : "-60px",
                left: lang === "ar" ? "-60px" : "auto",
                width: "220px", height: "220px", borderRadius: "50%",
                background: `radial-gradient(circle, ${project.color}08 0%, transparent 70%)`,
                pointerEvents: "none",
              }} />

              {/* Number watermark */}
              <div style={{
                position: "absolute",
                bottom: "-10px",
                right: lang === "ar" ? "auto" : "24px",
                left: lang === "ar" ? "24px" : "auto",
                fontSize: "100px", fontWeight: "800",
                fontFamily: "'Syne',sans-serif",
                color: isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.04)",
                lineHeight: 1, userSelect: "none", pointerEvents: "none",
              }}>
                {String(i + 1).padStart(2, "0")}
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "24px", flexDirection: lang === "ar" ? "row-reverse" : "row", flexWrap: "wrap" }}>
                {/* Icon */}
                <div style={{
                  width: "60px", height: "60px", borderRadius: "16px", flexShrink: 0,
                  background: `${project.color}15`, border: `1px solid ${project.color}25`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "28px",
                }}>
                  {project.icon}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: "240px", textAlign: lang === "ar" ? "right" : "left" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px", flexDirection: lang === "ar" ? "row-reverse" : "row", flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: "22px", fontWeight: "800", fontFamily: lang === "ar" ? "'Cairo',sans-serif" : "'Syne',sans-serif", color: isDark ? "#fff" : "#0A0A0F", margin: 0 }}>
                      {lang === "ar" ? project.titleAr : project.title}
                    </h3>
                    <span style={{
                      padding: "3px 10px", borderRadius: "6px",
                      background: `${project.color}12`, border: `1px solid ${project.color}25`,
                      color: project.color, fontSize: "11px", fontWeight: "700",
                      fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.05em",
                    }}>
                      {project.year}
                    </span>
                  </div>

                  <p style={{ fontSize: "15px", lineHeight: "1.8", color: isDark ? "#666" : "#555", fontFamily: ff, marginBottom: "20px", maxWidth: "640px" }}>
                    {lang === "ar" ? project.descAr : project.descEn}
                  </p>

                  {/* Stack tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px", justifyContent: lang === "ar" ? "flex-end" : "flex-start" }}>
                    {project.stack.map(tech => (
                      <span key={tech} style={{
                        padding: "5px 12px", borderRadius: "7px",
                        background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                        border: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)",
                        color: isDark ? "#aaa" : "#555",
                        fontSize: "12px", fontWeight: "500",
                        fontFamily: "'DM Sans',sans-serif",
                        transition: "all 0.2s",
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: lang === "ar" ? "flex-end" : "flex-start" }}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        padding: "10px 20px", borderRadius: "11px",
                        background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
                        color: isDark ? "#ccc" : "#333",
                        fontSize: "13px", fontWeight: "600",
                        textDecoration: "none", fontFamily: ff,
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = project.color + "60"; el.style.color = project.color; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"; el.style.color = isDark ? "#ccc" : "#333"; }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      {lang === "ar" ? "الكود المصدري" : "Source Code"}
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        padding: "10px 20px", borderRadius: "11px",
                        background: `linear-gradient(135deg, ${project.color}, ${project.color}BB)`,
                        color: "#000",
                        fontSize: "13px", fontWeight: "700",
                        textDecoration: "none", fontFamily: ff,
                        transition: "transform 0.2s, box-shadow 0.2s",
                      }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-2px)"; el.style.boxShadow = `0 8px 20px ${project.color}40`; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.boxShadow = ""; }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      {lang === "ar" ? "العرض المباشر" : "Live Demo"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
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
            {lang === "ar" ? "عرض كل المشاريع على GitHub" : "View all projects on GitHub"}
            <span style={{ opacity: 0.5 }}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
