import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAdmin } from "@/lib/auth";
import { getProjects, saveProjects, type Project } from "@/lib/projects";
export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  try { const form = await request.formData(); const image = form.get("image") as File; if (!image || image.size > 5_000_000) return NextResponse.json({ error: "Use uma imagem de até 5 MB." }, { status: 400 });
    let imageUrl = ""; if (process.env.BLOB_READ_WRITE_TOKEN) imageUrl = (await put(`vbg/projects/${crypto.randomUUID()}-${image.name}`, image, { access: "public" })).url; else { if (process.env.VERCEL) throw new Error("Armazenamento não configurado"); const bytes = Buffer.from(await image.arrayBuffer()); const file = `data:image/${image.type.split("/")[1]};base64,${bytes.toString("base64")}`; imageUrl = file; }
    const project: Project = { id: crypto.randomUUID(), title: String(form.get("title")), description: String(form.get("description")), technologies: String(form.get("technologies")).split(",").map(v=>v.trim()).filter(Boolean), imageUrl, createdAt: new Date().toISOString() }; const projects = await getProjects(); await saveProjects([project, ...projects]); return NextResponse.json({ project });
  } catch { return NextResponse.json({ error: "Configure o armazenamento da Vercel para publicar imagens." }, { status: 500 }); }
}
