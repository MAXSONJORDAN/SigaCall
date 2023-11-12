import { Sidebar } from '@/components/organismes/Sidebar'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin - Siga Call',
  description: 'Painel gerenciador de chamadas eletrônico.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Sidebar>
      {children}
    </Sidebar>
  )
}
