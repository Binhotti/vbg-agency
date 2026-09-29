import { NextResponse } from "next/server";
import { setAdminCookie } from "@/lib/auth";
export async function POST(request: Request) { const form = await request.formData(); if (!process.env.ADMIN_PASSWORD || form.get("password") !== process.env.ADMIN_PASSWORD) return NextResponse.redirect(new URL("/admin?erro=1", request.url), 303); await setAdminCookie(); return NextResponse.redirect(new URL("/admin", request.url), 303); }
