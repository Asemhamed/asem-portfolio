"use client";
import { useEffect, useRef } from "react";
import { useApp } from "@/app/layout";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { translations } from "@/libs/translations";

gsap.registerPlugin(ScrollTrigger);

const serviceColors = ["#00E5FF", "#FF6B35", "#A855F7", "#22C55E", "#F59E0B", "#EC4899"];

export default function ServicesSection() {
  const { lang, theme } = useApp();
  const t = translations[lang];
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLElement>(null);
  const ff = lang === "ar" ? "'Cairo',sans-serif" : "'DM Sans',sans-serif";
  const titleFont = lang === "ar" ? "'Cairo',sans-serif" : "'Syne',sans-serif";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".services-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".services-title", start: "top 80%" } });
      gsap.fromTo(".service-card", { opacity: 0, y: 40, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".service-card", start: "top 82%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} style={{
      minHeight: "100vh", padding: "100px 24px 120px",
      background: isDark ? "#0A0A0F" : "#F8F7F4",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="services-title" style={{ marginBottom: "60px", textAlign: lang === "ar" ? "right" : "left" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#00E5FF", fontWeight: "600", fontFamily: ff, marginBottom: "8px" }}>
            {t.services.subtitle}
          </p>
          <h2 style={{ fontSize: "clamp(36px,5vw,58px)", fontWeight: "800", fontFamily: titleFont, color: isDark ? "#fff" : "#0A0A0F", lineHeight: 1.1 }}>
            {t.services.title}
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          {t.services.items.map((service, i) => {
            const color = serviceColors[i];
            return (
              <div key={i} className="service-card" style={{
                background: isDark ? "rgba(255,255,255,0.025)" : "#fff",
                border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                borderRadius: "22px", padding: "32px",
                opacity: 0, transition: "all 0.3s",
                position: "relative", overflow: "hidden",
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = `1px solid ${color}40`;
                  el.style.transform = "translateY(-6px)";
                  el.style.boxShadow = `0 16px 48px ${color}15`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)";
                  el.style.transform = "";
                  el.style.boxShadow = "";
                }}
              >
                {/* Background glow */}
                <div style={{ position: "absolute", top: "-20px", right: lang === "ar" ? "auto" : "-20px", left: lang === "ar" ? "-20px" : "auto", width: "120px", height: "120px", borderRadius: "50%", background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`, pointerEvents: "none" }} />

                {/* Icon */}
                <div style={{
                  width: "52px", height: "52px", borderRadius: "14px",
                  background: `${color}15`,
                  border: `1px solid ${color}25`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "24px", marginBottom: "20px",
                }}>
                  {service.icon}
                </div>

                <h3 style={{
                  fontSize: "18px", fontWeight: "700",
                  fontFamily: lang === "ar" ? "'Cairo',sans-serif" : "'Syne',sans-serif",
                  color: isDark ? "#fff" : "#0A0A0F",
                  marginBottom: "10px",
                }}>
                  {service.title}
                </h3>

                <p style={{ fontSize: "14px", lineHeight: "1.75", color: isDark ? "#666" : "#666", fontFamily: ff, textAlign: lang === "ar" ? "right" : "left" }}>
                  {service.desc}
                </p>

                {/* Bottom accent */}
                <div style={{ position: "absolute", bottom: 0, left: lang === "ar" ? "auto" : 0, right: lang === "ar" ? 0 : "auto", height: "2px", width: "40%", background: `linear-gradient(${lang === "ar" ? "to left" : "to right"}, ${color}, transparent)`, borderRadius: "2px" }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
