import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AJAD 2025 - Acampamento de Jovens ADEB Setor 11",
  description: "Juventude, fé e diversão sob o mesmo céu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}