'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'en' | 'ar';

const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      services: 'Services',
      contact: 'Contact',
    },
    home: {
      greeting: "Hi, I'm",
      name: 'Asem Hamed',
      role: 'Frontend Developer',
      sub: 'Crafting responsive, pixel-perfect web experiences with React & Next.js',
      cta: 'View My Work',
      download: 'Download CV',
    },
    about: {
      title: 'About Me',
      p1: "I'm a Frontend Developer specializing in React and Next.js, dedicated to building responsive, accessible, and user-friendly web applications. Currently pursuing my Bachelor's in Computer Science at Helwan University (GPA 3.63/4.0), graduating June 2026.",
      p2: 'I love turning complex problems into clean, intuitive interfaces. Whether it\'s integrating APIs, building authentication systems, or optimizing performance — I care deeply about every pixel and every user interaction.',
      location: 'Cairo, Egypt',
      email: 'asmhmd789@gmail.com',
      phone: '+20 01159102332',
      university: 'Helwan University',
      degree: 'B.Sc. Computer Science',
      gpa: 'GPA: 3.63 / 4.0',
      graduation: 'Graduation: June 2026',
    },
    skills: {
      title: 'Skills & Technologies',
      categories: {
        languages: 'Languages',
        frameworks: 'Frameworks & Libraries',
        styling: 'Styling & UI',
        forms: 'Forms & Validation',
        tools: 'Tools & Deployment',
      },
    },
    services: {
      title: 'Services',
      items: [
        {
          icon: '⚡',
          title: 'Frontend Development',
          desc: 'Building fast, responsive web apps with React & Next.js using modern best practices.',
        },
        {
          icon: '🎨',
          title: 'UI/UX Implementation',
          desc: 'Translating designs into pixel-perfect, accessible interfaces with Tailwind CSS & Shadcn UI.',
        },
        {
          icon: '🔗',
          title: 'API Integration',
          desc: 'Connecting frontends to REST APIs using Axios, TanStack Query, and Redux Toolkit.',
        },
        {
          icon: '🛒',
          title: 'E-commerce Solutions',
          desc: 'Full-featured shops with cart, wishlist, checkout flows, and payment integration.',
        },
        {
          icon: '📱',
          title: 'Responsive Design',
          desc: 'Mobile-first layouts that look great on every screen size and device.',
        },
        {
          icon: '🚀',
          title: 'Performance Optimization',
          desc: 'Fast loading, SEO-friendly apps deployed on Vercel with Next.js optimizations.',
        },
      ],
    },
    contact: {
      title: 'Get In Touch',
      sub: "Have a project in mind? Let's work together.",
      name: 'Your Name',
      email: 'Your Email',
      message: 'Your Message',
      send: 'Send Message',
      or: 'Or reach me directly',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'عني',
      skills: 'المهارات',
      services: 'الخدمات',
      contact: 'التواصل',
    },
    home: {
      greeting: 'مرحباً، أنا',
      name: 'عاصم حامد',
      role: 'مطور واجهات أمامية',
      sub: 'أصنع تجارب ويب متجاوبة ومتقنة باستخدام React و Next.js',
      cta: 'استعرض أعمالي',
      download: 'تحميل السيرة الذاتية',
    },
    about: {
      title: 'عني',
      p1: 'أنا مطور واجهات أمامية متخصص في React وNext.js، أسعى لبناء تطبيقات ويب متجاوبة وسهلة الاستخدام. حالياً أدرس بكالوريوس علوم الحاسب بجامعة حلوان بمعدل تراكمي 3.63/4.0، ويتوقع تخرجي في يونيو 2026.',
      p2: 'أعشق تحويل المشكلات المعقدة إلى واجهات نظيفة وبديهية. سواء كان الأمر يتعلق بدمج APIs أو بناء أنظمة مصادقة أو تحسين الأداء — أهتم بكل بكسل وكل تفاعل مع المستخدم.',
      location: 'القاهرة، مصر',
      email: 'asmhmd789@gmail.com',
      phone: '+20 01159102332',
      university: 'جامعة حلوان',
      degree: 'بكالوريوس علوم الحاسب',
      gpa: 'المعدل: 3.63 / 4.0',
      graduation: 'التخرج: يونيو 2026',
    },
    skills: {
      title: 'المهارات والتقنيات',
      categories: {
        languages: 'اللغات',
        frameworks: 'الأطر والمكتبات',
        styling: 'التنسيق وواجهة المستخدم',
        forms: 'النماذج والتحقق',
        tools: 'الأدوات والنشر',
      },
    },
    services: {
      title: 'الخدمات',
      items: [
        {
          icon: '⚡',
          title: 'تطوير الواجهات الأمامية',
          desc: 'بناء تطبيقات ويب سريعة ومتجاوبة باستخدام React وNext.js وفق أفضل الممارسات.',
        },
        {
          icon: '🎨',
          title: 'تطبيق تصميمات UI/UX',
          desc: 'تحويل التصاميم إلى واجهات دقيقة وسهلة الوصول باستخدام Tailwind CSS وShadcn UI.',
        },
        {
          icon: '🔗',
          title: 'دمج الـ APIs',
          desc: 'ربط الواجهات بـ REST APIs باستخدام Axios وTanStack Query وRedux Toolkit.',
        },
        {
          icon: '🛒',
          title: 'حلول التجارة الإلكترونية',
          desc: 'متاجر متكاملة مع سلة تسوق وقوائم رغبات وتدفق دفع ودمج مدفوعات.',
        },
        {
          icon: '📱',
          title: 'التصميم المتجاوب',
          desc: 'تخطيطات Mobile-first تبدو رائعة على كل حجم شاشة وجهاز.',
        },
        {
          icon: '🚀',
          title: 'تحسين الأداء',
          desc: 'تطبيقات سريعة التحميل وصديقة لمحركات البحث تُنشر على Vercel.',
        },
      ],
    },
    contact: {
      title: 'تواصل معي',
      sub: 'هل لديك مشروع؟ لنعمل معاً.',
      name: 'اسمك',
      email: 'بريدك الإلكتروني',
      message: 'رسالتك',
      send: 'إرسال الرسالة',
      or: 'أو تواصل معي مباشرة',
    },
  },
};

type Translations = typeof translations.en;

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
  isRTL: boolean;
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
  isRTL: false,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const t = translations[lang] as Translations;
  const isRTL = lang === 'ar';

  return (
    <LangContext.Provider value={{ lang, setLang, t, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'font-arabic' : 'font-body'}>
        {children}
      </div>
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
