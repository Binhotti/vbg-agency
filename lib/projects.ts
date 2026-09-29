import fs from "node:fs/promises";
import path from "node:path";
import { list, put } from "@vercel/blob";

export type Project = { id: string; title: string; description: string; technologies: string[]; imageUrl: string; createdAt: string };
const indexKey = "vbg/projects.json";

export async function getProjects(): Promise<Project[]> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { blobs } = await list({ prefix: indexKey, limit: 1 });
    if (!blobs[0]) return [];
    // The index is overwritten, so bypass the public Blob CDN cache.
    const response = await fetch(`${blobs[0].url}?v=${Date.now()}`, { cache: "no-store" });
    return response.ok ? response.json() : [];
  }
  try { return JSON.parse(await fs.readFile(path.join(process.cwd(), "data/projects.json"), "utf8")); }
  catch { return []; }
}

export async function saveProjects(projects: Project[]) {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await put(indexKey, JSON.stringify(projects), { access: "public", addRandomSuffix: false, allowOverwrite: true, contentType: "application/json" });
    return;
  }
  if (process.env.VERCEL) throw new Error("Armazenamento ainda não configurado.");
  await fs.writeFile(path.join(process.cwd(), "data/projects.json"), JSON.stringify(projects, null, 2));
}
