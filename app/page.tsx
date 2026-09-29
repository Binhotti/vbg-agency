import { ArrowDown, ArrowUpRight, BarChart3, Braces, Code2, Layers3, Megaphone, MoveRight, Orbit } from "lucide-react";
import { getProjects } from "@/lib/projects";

const nav = [["01", "Início", "#inicio"], ["02", "Serviços", "#servicos"], ["03", "Tecnologias", "#tecnologias"], ["04", "Projetos", "#projetos"], ["05", "Contato", "#contato"]];
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
      <a className="brand" href="#inicio" aria-label="VBG Agency"><span className="brandMark">V</span><span>VBG<small>AGENCY</small></span></a>
      <nav>{nav.map(([n, label, href]) => <a href={href} key={href}><span>{n}</span>{label}</a>)}</nav>
      <div className="sideFoot"><span>BR · SP</span><a href="mailto:contato@vbgagency.com">Vamos conversar <ArrowUpRight size={14}/></a></div>
    </aside>
    <div className="page">
      <section id="inicio" className="hero section">
        <div className="eyebrow"><i/> SOLUÇÕES DIGITAIS · SÃO PAULO</div>
        <h1>Ideias que<br/>ganham <em>escala.</em></h1>
        <div className="heroBottom"><p>Unimos estratégia, design e tecnologia para criar experiências digitais que movem negócios para frente.</p><a className="roundCta" href="#contato" aria-label="Iniciar um projeto"><ArrowUpRight/></a></div>
        <div className="orbital" aria-hidden="true"><span className="orbit o1"/><span className="orbit o2"/><span className="core"><Orbit/></span><b>VBG</b></div>
        <a href="#servicos" className="scroll">EXPLORAR <ArrowDown size={15}/></a>
      </section>

      <section id="servicos" className="section services">
        <header className="sectionHead"><span>01 — CAPACIDADES</span><h2>Tecnologia com<br/><em>intenção.</em></h2><p>Não entregamos apenas telas bonitas. Construímos ferramentas digitais pensadas para gerar impacto mensurável.</p></header>
        <div className="serviceGrid">{services.map(({icon: Icon, ...item}) => <article key={item.n}><div><span>{item.n}</span><Icon/></div><h3>{item.title}</h3><p>{item.text}</p><MoveRight/></article>)}</div>
      </section>

      <section id="tecnologias" className="tech section">
        <div className="eyebrow"><i/> STACK QUE DOMINAMOS</div><h2>Ferramentas certas.<br/><em>Resultados reais.</em></h2>
        <div className="marquee"><div>{[...technologies, ...technologies].map((tech, i) => <span key={i}>{tech}<b>✦</b></span>)}</div></div>
        <div className="techMeta"><p>Da arquitetura ao lançamento, escolhemos cada tecnologia pelo que ela resolve — nunca por tendência.</p><span>DESENVOLVIMENTO · MÍDIA · DADOS</span></div>
      </section>

      <section id="projetos" className="section projects">
        <header className="sectionHead"><span>03 — TRABALHOS</span><h2>Projetos que<br/><em>falam por nós.</em></h2></header>
        {projects.length ? <div className="projectGrid">{projects.map((p) => <article key={p.id}><img src={p.imageUrl} alt={p.title}/><div><h3>{p.title}</h3><p>{p.description}</p><ul>{p.technologies.map(t => <li key={t}>{t}</li>)}</ul></div></article>)}</div> : <div className="emptyProjects"><Layers3/><div><span>EM BREVE</span><h3>Estamos preparando<br/>nossos primeiros cases.</h3><p>Novos projetos serão publicados aqui.</p></div></div>}
      </section>

      <section id="contato" className="contact section"><div className="eyebrow"><i/> PRONTO PARA COMEÇAR?</div><h2>Vamos transformar sua<br/>próxima ideia em <em>resultado.</em></h2><a href="mailto:contato@vbgagency.com">contato@vbgagency.com <ArrowUpRight/></a><footer><div className="brand"><span className="brandMark">V</span><span>VBG<small>AGENCY</small></span></div><p>© {new Date().getFullYear()} VBG Agency. Todos os direitos reservados.</p><a href="/admin">Área administrativa</a></footer></section>
    </div>
  </main>;
}
