import { Sidebar } from '@/components/organismes/Sidebar'
import type { Metadata } from 'next'
import { revalidatePath } from 'next/cache'
import { Inter } from 'next/font/google'
import { cookies, headers } from 'next/headers'
import jwt from 'jsonwebtoken'
import { redirect } from 'next/dist/server/api-utils'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin - Siga Call',
  description: 'Painel gerenciador de chamadas eletrônico.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const token = cookies().get("token");
  let user:any = {nome:""};
  if (token) {
    if (jwt.verify(token.value, "CB45jmph@@")) {
       user = jwt.decode(token.value);
    }

  }



  return (
    <Sidebar token={token} user={user}>
      {children}
    </Sidebar>
  )
}

export const revalidate = 0;