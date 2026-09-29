import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getProjects } from "@/lib/projects";
import { AdminPanel } from "@/components/AdminPanel";

export default async function AdminPage() {
  if (!(await isAdmin())) return <main className="login"><form action="/api/admin/login" method="post"><a className="brand" href="/"><span className="brandMark">V</span><span>VBG<small>AGENCY</small></span></a><div><span>ACESSO RESTRITO</span><h1>Painel administrativo</h1><p>Entre com sua senha para gerenciar os projetos publicados.</p></div><label>Senha<input name="password" type="password" required autoFocus placeholder="Sua senha"/></label><button>Entrar</button></form></main>;
  return <AdminPanel initialProjects={await getProjects()}/>;
}
