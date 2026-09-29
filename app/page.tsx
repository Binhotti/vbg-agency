import Image from "next/image";
import { ArrowDown, ArrowUpRight, BarChart3, Braces, Code2, Layers3, Megaphone, MoveRight } from "lucide-react";
import { getProjects } from "@/lib/projects";

const nav = [["01", "Início", "#inicio"], ["02", "Serviços", "#servicos"], ["03", "Projetos", "#projetos"], ["04", "Tecnologias", "#tecnologias"], ["05", "Contato", "#contato"]];
const technologies = ["Next.js", "Node.js", "TypeScript", "PHP", "MySQL", "Google Ads", "React", "Vercel", "Tailwind CSS", "SEO"];
const services = [
  { icon: Code2, n: "01", title: "Produtos digitais", text: "Sites, landing pages e sistemas rápidos, escaláveis e desenhados para converter." },
  { icon: Megaphone, n: "02", title: "Aquisição & mídia", text: "Google Ads e estratégias orientadas por dados para transformar atenção em demanda." },
  { icon: BarChart3, n: "03", title: "Performance", text: "Medição, otimização e automações para decisões mais rápidas e crescimento sustentável." },
];

export default async function Home() {
  const projects = await getProjects();
  return <main>
    <aside className="sidebar">
      <a className="brand" href="#inicio" aria-label="VBG Agency"><Image className="brandLogo" src="/vbg-logo.png" alt="VBG Agency" width={88} height={88} /></a>
      <nav>{nav.map(([n, label, href]) => <a href={href} key={href}><span>{n}</span>{label}</a>)}</nav>
      <div className="sideFoot"><span>BR · SC</span><a href="mailto:contato@vbgagency.com">Vamos conversar <ArrowUpRight size={14} /></a></div>
    </aside>
    <div className="page">
      <section id="inicio" className="heroBanner">
        <Image className="heroBannerImage" src="/vbg-banner.png" alt="VBG Agency: estratégia, marketing e resultados" width={2172} height={724} priority sizes="(max-width: 900px) 100vw, calc(100vw - 230px)" />
        <div className="bannerActions">
          <p>Estratégia e tecnologia para transformar presença digital em resultado.</p>
          <div className="bannerLinks"><a className="bannerExplore" href="#servicos">Conheça os serviços <ArrowDown size={16} /></a><a className="bannerCta" href="#contato">Vamos conversar <ArrowUpRight size={16} /></a></div>
        </div>
      </section>

      <section id="servicos" className="section services">
        <header className="sectionHead"><span>01 — CAPACIDADES</span><h2>Tecnologia com<br /><em>intenção.</em></h2><p>Não entregamos apenas telas bonitas. Construímos ferramentas digitais pensadas para gerar impacto mensurável.</p></header>
        <div className="serviceGrid">{services.map(({ icon: Icon, ...item }) => <article key={item.n}><div><span>{item.n}</span><Icon /></div><h3>{item.title}</h3><p>{item.text}</p><MoveRight /></article>)}</div>
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
