import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lucas e o Tesouro Final",
  description: "Um pequeno RPG de escolhas feito especialmente para Lucas."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
