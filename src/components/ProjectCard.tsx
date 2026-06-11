"use client";
import { useState } from "react";
import { useApp } from "@/app/layout";
import { translations } from "@/libs/translations";
import Image from "next/image";

interface Project {
  title: string;
  desc: string;
  stack: string[];
  color: string;
  icon: string;
  github: string;
  live: string;
  poster: string;
  year: string;
}

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  const { lang, theme } = useApp();
  const t = translations[lang];
  const isDark = theme === "dark";
  const ff = lang === "ar" ? "'Cairo',sans-serif" : "'DM Sans',sans-serif";
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      className="project-card"
      style={{
        opacity: 0,
        background: isDark ? "rgba(255,255,255,0.025)" : "#fff",
        border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
        borderRadius: "20px",
        overflow: "hidden",
        transition: "all 0.35s ease",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.border = `1px solid ${project.color}40`;
        el.style.transform = "translateY(-6px)";
        el.style.boxShadow = `0 24px 60px ${project.color}15`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.border = isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)";
        el.style.transform = "";
        el.style.boxShadow = "";
      }}
    >
      {/* Poster / Preview */}
      <div style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16/9",
        background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
        overflow: "hidden",
        flexShrink: 0,
      }}>
        {/* Skeleton shimmer */}
        {!imgLoaded && !imgError && (
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: isDark
              ? "linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 75%)"
              : "linear-gradient(90deg, rgba(0,0,0,0.03) 25%, rgba(0,0,0,0.06) 50%, rgba(0,0,0,0.03) 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }} />
        )}

        {/* Fallback when no image */}
        {imgError && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "8px",
            background: `${project.color}08`,
          }}>
            <span style={{ fontSize: "40px" }}>{project.icon}</span>
            <span style={{ fontSize: "11px", color: isDark ? "#444" : "#bbb", fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.1em" }}>
              PREVIEW
            </span>
          </div>
        )}

        {/* Actual screenshot */}
        {!imgError && (
          <Image
            src={project.poster}
            alt={project.title}
            width={640} height={360}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "top",
              opacity: imgLoaded ? 1 : 0,
              transition: "opacity 0.4s ease",
              display: "block",
            }}
          />
        )}

        {/* Overlay on hover with live link */}
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: `${project.color}00`,
            transition: "background 0.3s",
            textDecoration: "none",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${project.color}22`; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${project.color}00`; }}
        >
          <div style={{
            padding: "8px 16px", borderRadius: "10px",
            background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
            color: "#fff", fontSize: "12px", fontWeight: "600",
            fontFamily: "'DM Sans',sans-serif",
            opacity: 0, transition: "opacity 0.3s",
            display: "flex", alignItems: "center", gap: "6px",
          }}
            className="poster-label"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            {t.projects.liveDemo}
          </div>
        </a>

        {/* Year badge */}
        <div style={{
          position: "absolute", top: "12px",
          right: lang === "ar" ? "auto" : "12px",
          left: lang === "ar" ? "12px" : "auto",
          padding: "4px 10px", borderRadius: "8px",
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
          color: project.color, fontSize: "11px", fontWeight: "700",
          fontFamily: "'DM Sans',sans-serif",
        }}>
          {project.year}
        </div>

        {/* Number watermark */}
        <div style={{
          position: "absolute", bottom: "4px",
          left: lang === "ar" ? "auto" : "10px",
          right: lang === "ar" ? "10px" : "auto",
          fontSize: "72px", fontWeight: "800",
          fontFamily: "'Syne',sans-serif",
          color: "rgba(255,255,255,0.06)",
          lineHeight: 1, userSelect: "none", pointerEvents: "none",
        }}>
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "22px 24px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Title row */}
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          marginBottom: "10px",
          flexDirection: lang === "ar" ? "row-reverse" : "row",
        }}>
          <span style={{ fontSize: "22px" }}>{project.icon}</span>
          <h3 style={{
            fontSize: "18px", fontWeight: "800", margin: 0,
            fontFamily: lang === "ar" ? "'Cairo',sans-serif" : "'Syne',sans-serif",
            color: isDark ? "#fff" : "#0A0A0F",
          }}>
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p style={{
          fontSize: "13px", lineHeight: "1.75",
          color: isDark ? "#666" : "#666",
          fontFamily: ff, marginBottom: "16px", flex: 1,
          textAlign: lang === "ar" ? "right" : "left",
        }}>
          {project.desc}
        </p>

        {/* Stack tags */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "18px",
          justifyContent: lang === "ar" ? "flex-end" : "flex-start",
        }}>
          {project.stack.map(tech => (
            <span key={tech} style={{
              padding: "4px 10px", borderRadius: "6px",
              background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
              border: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)",
              color: isDark ? "#aaa" : "#555",
              fontSize: "11px", fontWeight: "500",
              fontFamily: "'DM Sans',sans-serif",
            }}>
              {tech}
            </span>
          ))}
        </div>

        {/* Accent line */}
        <div style={{
          height: "1px", marginBottom: "18px",
          background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0,
            left: lang === "ar" ? "auto" : 0,
            right: lang === "ar" ? 0 : "auto",
            height: "100%", width: "40%",
            background: `linear-gradient(${lang === "ar" ? "to left" : "to right"}, ${project.color}, transparent)`,
          }} />
        </div>

        {/* Buttons */}
        <div style={{
          display: "flex", gap: "8px",
          justifyContent: lang === "ar" ? "flex-end" : "flex-start",
        }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "9px 16px", borderRadius: "10px", flex: 1,
              justifyContent: "center",
              background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
              border: isDark ? "1px solid rgba(255,255,255,0.09)" : "1px solid rgba(0,0,0,0.09)",
              color: isDark ? "#bbb" : "#444",
              fontSize: "12px", fontWeight: "600",
              textDecoration: "none", fontFamily: ff,
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = project.color + "55"; el.style.color = project.color; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)"; el.style.color = isDark ? "#bbb" : "#444"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            {t.projects.sourceCode}
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "9px 16px", borderRadius: "10px", flex: 1,
              justifyContent: "center",
              background: `${project.color}18`,
              border: `1px solid ${project.color}35`,
              color: project.color,
              fontSize: "12px", fontWeight: "700",
              textDecoration: "none", fontFamily: ff,
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = `${project.color}28`; el.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = `${project.color}18`; el.style.transform = ""; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            {t.projects.liveDemo}
          </a>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .project-card:hover .poster-label {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}