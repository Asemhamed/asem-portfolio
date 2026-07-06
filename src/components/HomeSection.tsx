"use client";
import { useEffect, useRef } from "react";
import { useApp } from "@/app/layout";
import { gsap } from "gsap";
import { translations } from "@/libs/translations";
import Image from "next/image";

export default function HomeSection() {
  const { lang, theme } = useApp();
  const t = translations[lang];
  const isDark = theme === "dark";
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(orb1Ref.current, { y: -30, x: 20, duration: 4, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(orb2Ref.current, { y: 20, x: -15, duration: 5, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1 });
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(".hero-greeting", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
        .fromTo(".hero-name", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.3")
        .fromTo(".hero-role", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
        .fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.2")
        .fromTo(".hero-btns", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.2")
        .fromTo(".hero-socials", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2")
        .fromTo(imgRef.current, { opacity: 0, scale: 0.85, x: 40 }, { opacity: 1, scale: 1, x: 0, duration: 0.9, ease: "power3.out" }, "-=0.8");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const isRTL = lang === "ar";
  const ff = isRTL ? "'Cairo',sans-serif" : "'DM Sans',sans-serif";

  return (
    <section id="home" ref={sectionRef} style={{
      minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "100px 24px 120px",
      background: isDark ? "linear-gradient(135deg,#0A0A0F 0%,#0D0D18 50%,#0A0A0F 100%)" : "linear-gradient(135deg,#F8F7F4 0%,#EEECE5 50%,#F8F7F4 100%)",
    }}>
      <div ref={orb1Ref} style={{ position: "absolute", top: "10%", left: "5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(0,229,255,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div ref={orb2Ref} style={{ position: "absolute", bottom: "10%", right: "5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,107,53,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${isDark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.015)"} 1px,transparent 1px),linear-gradient(90deg,${isDark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.015)"} 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "48px", flexWrap: "wrap", flexDirection: isRTL ? "row-reverse" : "row" }}>
        <div style={{ flex: "1 1 380px", maxWidth: "580px" }}>
          <p className="hero-greeting" style={{ fontSize: "13px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#00E5FF", fontWeight: "600", marginBottom: "12px", fontFamily: ff, opacity: 0 }}>{t.home.greeting}</p>
          <h1 className="hero-name" style={{ fontSize: "clamp(44px,7vw,84px)", fontWeight: "800", lineHeight: 1.0, fontFamily: isRTL ? "'Cairo',sans-serif" : "'Syne',sans-serif", color: isDark ? "#fff" : "#0A0A0F", marginBottom: "16px", opacity: 0 }}>{t.home.name}</h1>
          <div className="hero-role" style={{ marginBottom: "20px", opacity: 0 }}>
            <span style={{ background: "linear-gradient(135deg,#00E5FF,#FF6B35)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontSize: "clamp(18px,2.5vw,26px)", fontWeight: "700", fontFamily: isRTL ? "'Cairo',sans-serif" : "'Syne',sans-serif" }}>{t.home.role}</span>
            <br /><span style={{ fontSize: "13px", color: isDark ? "#444" : "#999", fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.06em", marginTop: "4px", display: "block" }}>{t.home.subtitle}</span>
          </div>
          <p className="hero-desc" style={{ fontSize: "16px", lineHeight: "1.8", color: isDark ? "#666" : "#666", maxWidth: "480px", marginBottom: "36px", opacity: 0, fontFamily: ff }}>{t.home.description}</p>
          <div className="hero-btns" style={{ display: "flex", gap: "12px", flexWrap: "wrap", opacity: 0 }}>
            <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} style={{ padding: "13px 26px", borderRadius: "12px", background: "linear-gradient(135deg,#00E5FF,#0099AA)", color: "#000", fontWeight: "700", fontSize: "14px", border: "none", cursor: "pointer", fontFamily: ff, transition: "transform 0.2s,box-shadow 0.2s" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,229,255,0.3)" }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "" }}>
              {t.home.cta}
            </button>
            <a href="/Asem-Hamed-Frontend-Developer.pdf" download style={{ padding: "13px 26px", borderRadius: "12px", background: "transparent", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)", color: isDark ? "#bbb" : "#444", fontWeight: "600", fontSize: "14px", textDecoration: "none", fontFamily: ff, transition: "all 0.2s", display: "inline-flex", alignItems: "center", gap: "6px" }} onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#00E5FF"; el.style.color = "#00E5FF" }} onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"; el.style.color = isDark ? "#bbb" : "#444" }}>
              ↓ {t.home.cta2}
            </a>
          </div>
          <div className="hero-socials" style={{ display: "flex", gap: "10px", marginTop: "36px", opacity: 0 }}>
            {[{ href: "https://github.com/Asemhamed", txt: "GitHub" }, { href: "https://www.linkedin.com/in/asem-hamed-934b7732a/", txt: "LinkedIn" }, { href: "mailto:asmhmd789@gmail.com", txt: "Email" }, { href: "tel:+201159102332", txt: "Phone" }].map(s => (
              <a key={s.txt} href={s.href} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 14px", borderRadius: "10px", background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", border: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)", color: isDark ? "#555" : "#999", textDecoration: "none", fontSize: "12px", fontWeight: "600", fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.05em", transition: "all 0.2s" }} onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#00E5FF"; el.style.borderColor = "rgba(0,229,255,0.25)" }} onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = isDark ? "#555" : "#999"; el.style.borderColor = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}>{s.txt}</a>
            ))}
          </div>
        </div>

        <div ref={imgRef} style={{ flex: "0 0 auto", opacity: 0 }}>
          <div style={{ position: "relative", width: "clamp(240px,32vw,360px)", height: "clamp(300px,40vw,440px)" }}>
            <div style={{ position: "absolute", inset: "-10px", borderRadius: "28px", background: "linear-gradient(135deg,rgba(0,229,255,0.25),rgba(255,107,53,0.15),transparent)", zIndex: 0 }} />
            <div style={{ position: "absolute", inset: "-1px", borderRadius: "26px", background: isDark ? "#0A0A0F" : "#F8F7F4", zIndex: 1 }} />
            <div style={{ position: "relative", zIndex: 2, borderRadius: "22px", overflow: "hidden", width: "100%", height: "100%", border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.06)" }}>
              <Image src="/asem.jpg" alt="Asem Hamed" fill style={{ objectFit: "cover", objectPosition: "top center" }} priority />
            </div>
            <div style={{ position: "absolute", bottom: "-14px", right: isRTL ? "auto" : "-14px", left: isRTL ? "-14px" : "auto", background: "linear-gradient(135deg,#00E5FF,#0099AA)", borderRadius: "12px", padding: "10px 16px", zIndex: 3, boxShadow: "0 8px 24px rgba(0,229,255,0.25)" }}>
              <span style={{ fontSize: "11px", fontWeight: "800", color: "#000", fontFamily: "'Syne',sans-serif", letterSpacing: "0.05em" }}>React · Next.js</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
