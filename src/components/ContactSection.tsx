"use client";
import { useEffect, useRef} from "react";
import { useApp } from "@/app/layout";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { translations } from "@/libs/translations";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const { lang, theme } = useApp();
  const t = translations[lang];
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLElement>(null);
  const ff = lang === "ar" ? "'Cairo',sans-serif" : "'DM Sans',sans-serif";
  const titleFont = lang === "ar" ? "'Cairo',sans-serif" : "'Syne',sans-serif";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".contact-title", start: "top 80%" } });
      gsap.fromTo(".contact-form", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ".contact-form", start: "top 82%" } });
      gsap.fromTo(".contact-info", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ".contact-info", start: "top 82%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);


  const contactLinks = [
    { label: t.contact.phone, value: "(+20) 01159102332", href: "tel:+201159102332", icon: "📞", color: "#22C55E" },
    { label: t.contact.email, value: "asemhamedwork@gmail.com", href: "mailto:asemhamedwork@gmail.com", icon: "✉️", color: "#00E5FF" },
    { label: t.contact.github, value: "github.com/Asemhamed", href: "https://github.com/Asemhamed", icon: "⬡", color: "#A855F7" },
    { label: t.contact.linkedin, value: "linkedin.com/in/asem-hamed", href: "https://www.linkedin.com/in/asem-hamed-934b7732a/", icon: "in", color: "#FF6B35" },
  ];

  return (
    <section id="contact" ref={sectionRef} style={{
      minHeight: "100vh", padding: "100px 24px 160px",
      background: isDark ? "linear-gradient(180deg, #0A0A0F 0%, #0D0D18 100%)" : "linear-gradient(180deg, #F8F7F4 0%, #F0EEE8 100%)",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="contact-title" style={{ marginBottom: "60px", textAlign: lang === "ar" ? "right" : "left" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#00E5FF", fontWeight: "600", fontFamily: ff, marginBottom: "8px" }}>
            {t.contact.subtitle}
          </p>
          <h2 style={{ fontSize: "clamp(36px,5vw,58px)", fontWeight: "800", fontFamily: titleFont, color: isDark ? "#fff" : "#0A0A0F", lineHeight: 1.1 }}>
            {t.contact.title}
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px" }}>

          {/* Contact info */}
          <div className="contact-info" style={{ display: "flex", flexDirection: "column", gap: "14px", opacity: 0 }}>
            {contactLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{
                display: "flex", alignItems: "center", gap: "16px",
                padding: "20px 22px", borderRadius: "16px",
                background: isDark ? "rgba(255,255,255,0.025)" : "#fff",
                border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                textDecoration: "none", transition: "all 0.25s",
                flexDirection: lang === "ar" ? "row-reverse" : "row",
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = `1px solid ${link.color}40`;
                  el.style.transform = "translateX(4px)";
                  el.style.boxShadow = `0 8px 24px ${link.color}12`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)";
                  el.style.transform = "";
                  el.style.boxShadow = "";
                }}
              >
                <div style={{
                  width: "44px", height: "44px", borderRadius: "12px",
                  background: `${link.color}15`,
                  border: `1px solid ${link.color}25`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "18px", flexShrink: 0,
                }}>
                  {link.icon}
                </div>
                <div style={{ textAlign: lang === "ar" ? "right" : "left" }}>
                  <p style={{ fontSize: "11px", color: link.color, fontWeight: "600", fontFamily: ff, letterSpacing: "0.1em", textTransform: "uppercase" }}>{link.label}</p>
                  <p style={{ fontSize: "14px", color: isDark ? "#aaa" : "#555", fontFamily: "'DM Sans',sans-serif", marginTop: "2px" }}>{link.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
