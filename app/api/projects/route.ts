import { NextResponse } from "next/server";
import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/auth";
import { getProjects, saveProjects, type Project } from "@/lib/projects";

async function uploadImage(image: File) {
  if (image.size > 5_000_000) throw new Error("IMAGE_TOO_LARGE");
  if (!image.type.match(/^image\/(png|jpeg|webp)$/)) throw new Error("INVALID_IMAGE");
  if (process.env.BLOB_READ_WRITE_TOKEN) return (await put(`vbg/projects/${crypto.randomUUID()}-${image.name}`, image, { access: "public" })).url;
  if (process.env.VERCEL) throw new Error("STORAGE_NOT_CONFIGURED");
  const bytes = Buffer.from(await image.arrayBuffer());
  return `data:image/${image.type.split("/")[1]};base64,${bytes.toString("base64")}`;
}

function projectFields(form: FormData) {
  const title = String(form.get("title") || "").trim();
  const description = String(form.get("description") || "").trim();
  const technologies = String(form.get("technologies") || "").split(",").map(value => value.trim()).filter(Boolean);
  if (!title || !description || !technologies.length) throw new Error("INVALID_FIELDS");
  return { title, description, technologies };
}

function errorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  if (message === "IMAGE_TOO_LARGE") return NextResponse.json({ error: "Use uma imagem de até 5 MB." }, { status: 400 });
  if (message === "INVALID_IMAGE") return NextResponse.json({ error: "Use uma imagem PNG, JPG ou WEBP." }, { status: 400 });
  if (message === "INVALID_FIELDS") return NextResponse.json({ error: "Preencha todos os campos." }, { status: 400 });
  return NextResponse.json({ error: "Não foi possível salvar o projeto." }, { status: 500 });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  try {
    const form = await request.formData();
    const image = form.get("image");
    if (!(image instanceof File) || !image.size) return NextResponse.json({ error: "Adicione uma imagem." }, { status: 400 });
    const project: Project = { id: crypto.randomUUID(), ...projectFields(form), imageUrl: await uploadImage(image), createdAt: new Date().toISOString() };
    await saveProjects([project, ...await getProjects()]);
    revalidatePath("/");
    return NextResponse.json({ project });
  } catch (error) { return errorResponse(error); }
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  try {
    const form = await request.formData();
    const id = String(form.get("id") || "");
    const projects = await getProjects();
    const current = projects.find(project => project.id === id);
    if (!current) return NextResponse.json({ error: "Projeto não encontrado." }, { status: 404 });
    const image = form.get("image");
    const imageUrl = image instanceof File && image.size ? await uploadImage(image) : current.imageUrl;
    const project: Project = { ...current, ...projectFields(form), imageUrl };
    await saveProjects(projects.map(item => item.id === id ? project : item));
    if (imageUrl !== current.imageUrl && process.env.BLOB_READ_WRITE_TOKEN && current.imageUrl.startsWith("http")) await del(current.imageUrl).catch(() => undefined);
    revalidatePath("/");
    return NextResponse.json({ project });
  } catch (error) { return errorResponse(error); }
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  try {
    const { id } = await request.json() as { id?: string };
    const projects = await getProjects();
    const project = projects.find(item => item.id === id);
    if (!project) return NextResponse.json({ error: "Projeto não encontrado." }, { status: 404 });
    await saveProjects(projects.filter(item => item.id !== id));
    if (process.env.BLOB_READ_WRITE_TOKEN && project.imageUrl.startsWith("http")) await del(project.imageUrl).catch(() => undefined);
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "Não foi possível excluir o projeto." }, { status: 500 }); }
}
