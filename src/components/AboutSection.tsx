"use client";
import { useEffect, useRef } from "react";
import { useApp } from "@/app/layout";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { translations } from "@/libs/translations";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const { lang, theme } = useApp();
  const t = translations[lang];
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLElement>(null);
  const ff = lang === "ar" ? "'Cairo',sans-serif" : "'DM Sans',sans-serif";
  const titleFont = lang === "ar" ? "'Cairo',sans-serif" : "'Syne',sans-serif";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-title", { opacity:0, y:40 }, { opacity:1, y:0, duration:0.8, ease:"power3.out", scrollTrigger:{trigger:".about-title",start:"top 80%"} });
      gsap.fromTo(".about-bio-p", { opacity:0, y:30 }, { opacity:1, y:0, duration:0.7, stagger:0.15, ease:"power2.out", scrollTrigger:{trigger:".about-bio-p",start:"top 82%"} });
      gsap.fromTo(".about-card", { opacity:0, y:30 }, { opacity:1, y:0, duration:0.6, stagger:0.12, ease:"power2.out", scrollTrigger:{trigger:".about-card",start:"top 85%"} });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const cs = { background: isDark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.03)", border: isDark?"1px solid rgba(255,255,255,0.07)":"1px solid rgba(0,0,0,0.07)", borderRadius:"20px", padding:"24px", transition:"all 0.3s" };

  return (
    <section id="about" ref={sectionRef} style={{ minHeight:"100vh", padding:"100px 24px 120px", background: isDark?"#0A0A0F":"#F8F7F4" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
        <div className="about-title" style={{ marginBottom:"60px", textAlign: lang==="ar"?"right":"left" }}>
          <p style={{ fontSize:"11px", letterSpacing:"0.25em", textTransform:"uppercase", color:"#00E5FF", fontWeight:"600", fontFamily:ff, marginBottom:"8px" }}>{t.about.subtitle}</p>
          <h2 style={{ fontSize:"clamp(36px,5vw,58px)", fontWeight:"800", fontFamily:titleFont, color: isDark?"#fff":"#0A0A0F", lineHeight:1.1 }}>{t.about.title}</h2>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"48px", alignItems:"start" }}>
          <div>
            {[t.about.bio1, t.about.bio2, t.about.bio3].map((bio,i) => (
              <p key={i} className="about-bio-p" style={{ fontSize:"15px", lineHeight:"1.85", color: isDark?"#666":"#555", fontFamily:ff, marginBottom:"18px", opacity:0, textAlign: lang==="ar"?"right":"left" }}>{bio}</p>
            ))}
            <a href="/Asem-Hamed-Frontend-Developer.pdf" download className="about-bio-p" style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"12px 22px", borderRadius:"12px", background:"linear-gradient(135deg,#00E5FF,#0099AA)", color:"#000", fontWeight:"700", fontSize:"14px", textDecoration:"none", fontFamily:ff, opacity:0, transition:"transform 0.2s,box-shadow 0.2s", marginTop:"8px" }} onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.transform="translateY(-2px)";el.style.boxShadow="0 8px 24px rgba(0,229,255,0.3)"}} onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.transform="";el.style.boxShadow=""}}>
              ↓ {t.about.downloadCV}
            </a>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
            <div className="about-card" style={{ ...cs, opacity:0 }}>
              <p style={{ fontSize:"10px", letterSpacing:"0.22em", textTransform:"uppercase", color:"#00E5FF", marginBottom:"12px", fontFamily:ff, fontWeight:"600" }}>🎓 {t.about.education}</p>
              <p style={{ fontWeight:"700", fontSize:"16px", color: isDark?"#fff":"#111", fontFamily:ff, marginBottom:"3px" }}>{t.about.university}</p>
              <p style={{ color: isDark?"#666":"#555", fontSize:"14px", fontFamily:ff, marginBottom:"3px" }}>{t.about.degree}</p>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"10px" }}>
                <span style={{ background:"linear-gradient(135deg,#00E5FF,#FF6B35)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", fontWeight:"700", fontSize:"13px" }}>{t.about.gpa}</span>
                <span style={{ color: isDark?"#444":"#aaa", fontSize:"11px", fontFamily:ff }}>{t.about.period}</span>
              </div>
            </div>
            <div className="about-card" style={{ ...cs, opacity:0 }}>
              <p style={{ fontSize:"10px", letterSpacing:"0.22em", textTransform:"uppercase", color:"#FF6B35", marginBottom:"12px", fontFamily:ff, fontWeight:"600" }}>💼 {t.about.training}</p>
              <p style={{ fontWeight:"700", fontSize:"15px", color: isDark?"#fff":"#111", fontFamily:ff, marginBottom:"3px" }}>{t.about.course}</p>
              <p style={{ color: isDark?"#666":"#555", fontSize:"13px", fontFamily:ff }}>{t.about.academy}</p>
            </div>
            <div className="about-card" style={{ ...cs, opacity:0 }}>
              <p style={{ fontSize:"10px", letterSpacing:"0.22em", textTransform:"uppercase", color:"#00E5FF", marginBottom:"12px", fontFamily:ff, fontWeight:"600" }}>🌍 {t.about.languages}</p>
              <div style={{ display:"flex", gap:"10px" }}>
                {[{name:t.about.arabic,level:t.about.arabicLevel},{name:t.about.english,level:t.about.englishLevel}].map(l=>(
                  <div key={l.name} style={{ flex:1, background: isDark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)", borderRadius:"10px", padding:"12px", textAlign:"center" }}>
                    <p style={{ fontWeight:"700", fontSize:"14px", color: isDark?"#fff":"#111", fontFamily:ff }}>{l.name}</p>
                    <p style={{ color: isDark?"#555":"#999", fontSize:"11px", fontFamily:ff, marginTop:"2px" }}>{l.level}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
