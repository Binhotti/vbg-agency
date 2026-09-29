import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "VBG Agency — Soluções digitais", description: "Estratégia, tecnologia e performance para negócios que querem crescer com inteligência.", icons: { icon: "/favicon.png" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body>{children}</body></html>; }
