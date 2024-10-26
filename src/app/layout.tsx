import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

// Configuração da fonte Nunito
const nunito = Nunito({
  subsets: ['latin'], // Carrega apenas o subset latin
  // Opcionalmente, você pode especificar os pesos que deseja usar
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  // Você pode adicionar também os estilos italic se precisar
  // style: ['normal', 'italic'],
  variable: '--font-nunito', // Variável CSS para usar com Tailwind
});

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
    <html lang="en">
      <body className={`${nunito.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}