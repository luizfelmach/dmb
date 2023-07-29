import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local';

const inter = localFont({ src: '../assets/fonts/inter/Inter-Regular.ttf' })


export const metadata: Metadata = {
  title: 'Darlene Machado Buffet',
  description: 'Casamentos, Aniversários, Eventos Corporativos, Coffe Break, Buffet Infantil, Churrasco & Aluguel de utensílios',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
