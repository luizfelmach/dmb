import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "./providers";

const inter = localFont({ src: "../assets/fonts/inter/Inter-Regular.ttf" });

export const metadata: Metadata = {
  title: "Darlene Machado Buffet",
  description:
    "Casamentos, Aniversários, Eventos Corporativos, Coffe Break, Buffet Infantil, Churrasco & Aluguel de utensílios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
