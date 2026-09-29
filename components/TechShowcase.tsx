"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, BarChart3, Cloud, Database, LayoutGrid, Monitor, Server, Wrench } from "lucide-react";
import { SiDocker, SiFigma, SiGit, SiGoogleads, SiGoogleanalytics, SiNextdotjs, SiNodedotjs, SiPostgresql, SiReact, SiTailwindcss, SiTypescript, SiVercel } from "react-icons/si";

const categories = [
  { name: "Todos", icon: LayoutGrid },
  { name: "Frontend", icon: Monitor },
  { name: "Backend", icon: Server },
  { name: "Banco de Dados", icon: Database },
  { name: "Cloud & DevOps", icon: Cloud },
  { name: "Ferramentas", icon: Wrench },
  { name: "Marketing & SEO", icon: BarChart3 },
];

const technologies = [
  { name: "Next.js", description: "Framework React para aplicações web modernas.", category: "Frontend", icon: SiNextdotjs, color: "#ffffff", iconBg: "#02050a" },
  { name: "React", description: "Biblioteca para interfaces reativas e escaláveis.", category: "Frontend", icon: SiReact, color: "#2bc8f7", iconBg: "#020b17" },
  { name: "Node.js", description: "Ambiente de execução JavaScript no servidor.", category: "Backend", icon: SiNodedotjs, color: "#79c72b" },
  { name: "TypeScript", description: "JavaScript com tipagem para mais segurança.", category: "Frontend", icon: SiTypescript, color: "#2f89f7" },
  { name: "Tailwind CSS", description: "Framework CSS utilitário para interfaces modernas.", category: "Frontend", icon: SiTailwindcss, color: "#27d4e8" },
  { name: "PostgreSQL", description: "Banco de dados relacional robusto e escalável.", category: "Banco de Dados", icon: SiPostgresql, color: "#65a9df" },
  { name: "Vercel", description: "Plataforma de deploy e hospedagem.", category: "Cloud & DevOps", icon: SiVercel, color: "#ffffff", iconBg: "#02050a" },
  { name: "Google Ads", description: "Plataforma de anúncios para gerar resultados.", category: "Marketing & SEO", icon: SiGoogleads, color: "#4285f4" },
  { name: "Google Analytics", description: "Análise de dados e comportamento de usuários.", category: "Marketing & SEO", icon: SiGoogleanalytics, color: "#f7a20d" },
  { name: "Docker", description: "Containers para ambientes consistentes e escaláveis.", category: "Cloud & DevOps", icon: SiDocker, color: "#1d9fec" },
  { name: "Git", description: "Controle de versão para desenvolvimento.", category: "Ferramentas", icon: SiGit, color: "#f34f3b" },
  { name: "Figma", description: "Design de interfaces colaborativas.", category: "Ferramentas", icon: SiFigma, color: "#f45b54" },
];

export function TechShowcase() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const filtered = activeCategory === "Todos" ? technologies : technologies.filter(technology => technology.category === activeCategory);

  return <section id="tecnologias" className="techShowcase">
    <header className="techHero">
      <div className="techHeading"><span><i/>03 — STACK QUE DOMINAMOS</span><h2>Ferramentas certas.<br/><em>Resultados reais.</em></h2><p>Da arquitetura ao lançamento, escolhemos cada tecnologia pelo que ela resolve — nunca por tendência.</p></div>
      <div className="techVisual"><Image src="/technologies-showcase.png" alt="Tecnologias conectadas da VBG Agency" width={1760} height={880} sizes="(max-width: 900px) 100vw, 48vw"/></div>
    </header>
    <div className="techFilters" role="tablist" aria-label="Filtrar tecnologias">{categories.map(({ name, icon: Icon }) => <button key={name} type="button" role="tab" aria-selected={activeCategory === name} className={activeCategory === name ? "active" : ""} onClick={() => setActiveCategory(name)}><Icon size={19}/>{name}</button>)}</div>
    <div className="techCatalog" aria-live="polite">{filtered.map(({ icon: Icon, ...technology }) => <article key={technology.name}>
      <div className="techLogo" style={{ color: technology.color, background: technology.iconBg || "transparent" }}><Icon/></div>
      <div className="techCardCopy"><h3>{technology.name}</h3><p>{technology.description}</p><span>{technology.category}</span></div>
      <a href="#contato" aria-label={`Conversar sobre ${technology.name}`}><ArrowUpRight size={18}/></a>
    </article>)}</div>
  </section>;
}
