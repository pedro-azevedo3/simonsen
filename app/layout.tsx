import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Colégio Roberto Simonsen - Notícias e Eventos',
  description: 'Portal de notícias, eventos e galeria de fotos do Colégio Roberto Simonsen',
  keywords: ['colégio', 'Roberto Simonsen', 'educação', 'notícias escolares', 'eventos'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>{children}</body>
    </html>
  )
}
