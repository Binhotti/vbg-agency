import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const name = "vbg_admin";
function signature() { return createHmac("sha256", process.env.AUTH_SECRET || "vbg-local-secret").update("authenticated").digest("hex"); }
export async function isAdmin() {
  const value = (await cookies()).get(name)?.value || "";
  const expected = signature();
  return value.length === expected.length && timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}
export async function setAdminCookie() { (await cookies()).set(name, signature(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 12 }); }
export async function clearAdminCookie() { (await cookies()).delete(name); }
