"use client";
import { useEffect } from "react";
import { useApp } from "./layout";
import TopBar from "@/components/TopBar";
import HomeSection from "@/components/HomeSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import BottomNav from "@/components/BottomNav";
import ProjectsSection from "@/components/ProjectsSection";


const SECTIONS = ["home","about","skills","projects","services","contact"];

export default function Home() {
  const { setActiveSection } = useApp();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4, rootMargin: "-10% 0px -10% 0px" }
    );
    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <main>
      <TopBar />
      <HomeSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ServicesSection />
      <ContactSection />
      <BottomNav />
    </main>
  );
}
