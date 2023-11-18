import { Sidebar } from '@/components/organismes/Sidebar'
import type { Metadata } from 'next'
import { revalidatePath } from 'next/cache'
import { Inter } from 'next/font/google'
import { cookies, headers } from 'next/headers'
import jwt from 'jsonwebtoken'
import { redirect } from 'next/navigation'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin - Siga Call',
  description: 'Painel gerenciador de chamadas eletrônico.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  let token: any = cookies().get("token");
  let user: any = { nome: "" };
  if (token) {
    try {
      jwt.verify(token.value, process.env.JWT_KEY??"SecretSigaCallKey")
      user = jwt.decode(token.value);
    } catch (error) {
      redirect("/admin/logout")
    }

  } 

  return (
    <Sidebar token={token} user={user}>
      {children}
    </Sidebar>
  )
}

export const revalidate = 0;