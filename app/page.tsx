import Image from "next/image";
import { ArrowDown, ArrowUpRight, BarChart3, BriefcaseBusiness, Folder, Home as HomeIcon, Layers3, Mail, MessageCircle, Target } from "lucide-react";
import { getProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const nav = [{ icon: HomeIcon, label: "Início", href: "#inicio" }, { icon: BriefcaseBusiness, label: "Serviços", href: "#servicos" }, { icon: Folder, label: "Projetos", href: "#projetos" }, { icon: Layers3, label: "Tecnologias", href: "#tecnologias" }, { icon: Mail, label: "Contato", href: "#contato" }];
const technologies = ["Next.js", "Node.js", "TypeScript", "PHP", "MySQL", "Google Ads", "React", "Vercel", "Tailwind CSS", "SEO"];
const services = [
  { icon: BarChart3, title: "Estratégia", text: "Planejamento baseado em dados para decisões mais inteligentes." },
  { icon: Layers3, title: "Desenvolvimento", text: "Soluções sob medida com as tecnologias mais modernas." },
  { icon: Target, title: "Resultados", text: "Projetos focados em gerar crescimento real para o seu negócio." },
];

export default async function Home() {
  const projects = await getProjects();
  return <main>
    <aside className="sidebar">
      <a className="brand" href="#inicio" aria-label="VBG Agency"><Image className="brandLogo" src="/vbg-logo.png" alt="VBG Agency" width={88} height={88} /></a>
      <nav>{nav.map(({ icon: Icon, label, href }, index) => <a className={index === 0 ? "active" : ""} href={href} key={href}><Icon size={20}/><span>{label}</span>{index === 0 && <i/>}</a>)}</nav>
      <div className="sideFoot"><a href="#contato"><MessageCircle size={18}/>Vamos conversar <ArrowUpRight size={14} /></a></div>
    </aside>
    <div className="page">
      <section id="inicio" className="newHero">
        <div className="heroCopy">
          <div className="heroKicker"><i/> VBG AGENCY</div>
          <h1>Estratégia e tecnologia<br/>para transformar<br/>presença digital<br/><em>em resultado.</em></h1>
          <p>Unimos estratégia, marketing e tecnologia para criar soluções digitais que impulsionam o crescimento do seu negócio.</p>
          <div className="heroActions"><a className="primaryAction" href="#contato">Vamos conversar <ArrowUpRight size={17}/></a><a className="secondaryAction" href="#servicos">Conheça nossos serviços <ArrowDown size={17}/></a></div>
        </div>
        <div className="heroVisual"><Image src="/hero-dashboard.png" alt="Painel digital com gráficos de crescimento" width={1760} height={880} priority sizes="(max-width: 900px) 100vw, 60vw"/></div>
      </section>

      <section id="servicos" className="capabilitySection">
        <div className="capabilityIntro"><span>01 — CAPACIDADES</span><h2>Tecnologia com<br/><em>intenção.</em></h2><p>Não entregamos apenas telas bonitas. Construímos ferramentas digitais pensadas para gerar impacto mensurável.</p><div className="trustLine"><div><b>V</b><b>B</b><b>G</b><strong>+12</strong></div><span>Mais de 12 empresas<br/>já confiaram em nosso trabalho.</span></div></div>
        <div className="capabilityCards">{services.map(({ icon: Icon, title, text }) => <article key={title}><div className="capabilityIcon"><Icon size={27}/></div><h3>{title}</h3><p>{text}</p><a href="#contato" aria-label={`Conheça ${title}`}><ArrowUpRight size={18}/></a></article>)}</div>
      </section>

      <section id="projetos" className="section projects">
        <header className="sectionHead"><span>02 — TRABALHOS</span><h2>Projetos que<br /><em>falam por nós.</em></h2></header>
        {projects.length ? <div className="projectGrid">{projects.map((p) => <article key={p.id}><img src={p.imageUrl} alt={p.title} /><div><h3>{p.title}</h3><p>{p.description}</p><ul>{p.technologies.map(t => <li key={t}>{t}</li>)}</ul></div></article>)}</div> : <div className="emptyProjects"><Layers3 /><div><span>EM BREVE</span><h3>Estamos preparando<br />nossos primeiros cases.</h3><p>Novos projetos serão publicados aqui.</p></div></div>}
      </section>

      <section id="tecnologias" className="tech section">
        <div className="eyebrow"><i /> 03 — STACK QUE DOMINAMOS</div><h2>Ferramentas certas.<br /><em>Resultados reais.</em></h2>
        <div className="marquee"><div>{[...technologies, ...technologies].map((tech, i) => <span key={i}>{tech}<b>✦</b></span>)}</div></div>
        <div className="techMeta"><p>Da arquitetura ao lançamento, escolhemos cada tecnologia pelo que ela resolve — nunca por tendência.</p><span>DESENVOLVIMENTO · MÍDIA · DADOS</span></div>
      </section>

      <section id="contato" className="contact section"><div className="eyebrow"><i /> PRONTO PARA COMEÇAR?</div><h2>Vamos transformar sua<br />próxima ideia em <em>resultado.</em></h2><a href="mailto:agencyvbg@gmail.com">agencyvbg@gmail.com <ArrowUpRight />
      </a>
      <footer>
        <div className="brand"><Image className="brandLogo" src="/vbg-logo.png" alt="VBG Agency" width={88} height={88} />
        </div>
        <p>© {new Date().getFullYear()} VBG Agency. Todos os direitos reservados.</p>
      </footer>
      </section>
    </div>
  </main>;
}
