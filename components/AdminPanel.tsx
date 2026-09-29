"use client";

import { useRef, useState } from "react";
import { Edit3, LogOut, Plus, Save, Trash2, UploadCloud, X } from "lucide-react";
import type { Project } from "@/lib/projects";

const emptyForm = { title: "", description: "", technologies: "" };

export function AdminPanel({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [fields, setFields] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function updateField(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFields(current => ({ ...current, [event.target.name]: event.target.value }));
  }

  function resetForm() {
    setFields(emptyForm);
    setEditingId(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  function startEditing(project: Project) {
    setEditingId(project.id);
    setFields({ title: project.title, description: project.description, technologies: project.technologies.join(", ") });
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    if (editingId) form.append("id", editingId);
    const response = await fetch("/api/projects", { method: editingId ? "PUT" : "POST", body: form });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) return setMessage(data.error || "Não foi possível salvar.");
    setProjects(current => editingId ? current.map(project => project.id === editingId ? data.project : project) : [data.project, ...current]);
    setMessage(editingId ? "Projeto atualizado com sucesso." : "Projeto publicado com sucesso.");
    resetForm();
  }

  async function remove(project: Project) {
    if (!window.confirm(`Excluir “${project.title}”? Esta ação não pode ser desfeita.`)) return;
    setDeletingId(project.id);
    setMessage("");
    const response = await fetch("/api/projects", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: project.id }) });
    const data = await response.json();
    setDeletingId(null);
    if (!response.ok) return setMessage(data.error || "Não foi possível excluir.");
    setProjects(current => current.filter(item => item.id !== project.id));
    if (editingId === project.id) resetForm();
    setMessage("Projeto excluído com sucesso.");
  }

  return <div className="adminShell">
    <aside><a className="brand" href="/"><span className="brandMark">V</span><span>VBG<small>AGENCY</small></span></a><nav><a className="active">Projetos</a><a href="/">Ver site</a></nav><form action="/api/admin/logout" method="post"><button><LogOut size={17}/> Sair</button></form></aside>
    <section>
      <header><div><span>PAINEL ADMINISTRATIVO</span><h1>Projetos</h1></div><b>{projects.length} publicados</b></header>
      <form className="projectForm" onSubmit={submit}>
        <div className="formTitle">{editingId ? <Edit3/> : <Plus/>}<div><h2>{editingId ? "Editar projeto" : "Novo projeto"}</h2><p>{editingId ? "Altere as informações e salve." : "Preencha as informações para publicar no site."}</p></div>{editingId && <button className="cancelEdit" type="button" onClick={resetForm}><X size={16}/> Cancelar</button>}</div>
        <label>Título<input name="title" required placeholder="Nome do projeto" value={fields.title} onChange={updateField}/></label>
        <label>Descrição<textarea name="description" required placeholder="Conte o desafio e a solução" rows={4} value={fields.description} onChange={updateField}/></label>
        <label>Tecnologias<input name="technologies" required placeholder="Next.js, TypeScript, MySQL" value={fields.technologies} onChange={updateField}/><small>Separe por vírgulas</small></label>
        <label className="upload"><UploadCloud/><b>{editingId ? "Trocar imagem (opcional)" : "Adicionar imagem"}</b><span>PNG, JPG ou WEBP · máximo 5 MB</span><input ref={fileRef} name="image" required={!editingId} type="file" accept="image/png,image/jpeg,image/webp"/></label>
        <button className="publish" disabled={loading}>{editingId ? <Save size={17}/> : null}{loading ? "Salvando..." : editingId ? "Salvar alterações" : "Publicar projeto"}</button>
        {message && <p className="message">{message}</p>}
      </form>
      <div className="adminList">{projects.map(project => <article key={project.id}><img src={project.imageUrl} alt=""/><div className="projectSummary"><h3>{project.title}</h3><p>{project.technologies.join(" · ")}</p></div><div className="projectActions"><button type="button" onClick={() => startEditing(project)}><Edit3 size={16}/> Editar</button><button className="deleteProject" type="button" disabled={deletingId === project.id} onClick={() => remove(project)}><Trash2 size={16}/> {deletingId === project.id ? "Excluindo..." : "Excluir"}</button></div></article>)}</div>
    </section>
  </div>;
}
