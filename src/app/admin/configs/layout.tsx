import { Sidebar } from '@/components/organismes/Sidebar'
import type { Metadata } from 'next'
import { revalidatePath } from 'next/cache'
import { Inter } from 'next/font/google'
import { cookies, headers } from 'next/headers'
import jwt from 'jsonwebtoken'
import { redirect } from 'next/navigation'
import { db } from '@/db/connector'
import { SemPermissao } from '@/components/organismes/SemPermissao'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Configurações - Siga Call',
    description: 'Painel gerenciador de chamadas eletrônico.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {

    let token: any = cookies().get("token");
    let user: any = { nome: "" };
    if (token) {
        try {
            jwt.verify(token.value, process.env.JWT_KEY??"SecretSigaCallKey")
            user = jwt.decode(token.value);
            console.log(user)
            const updatedUser = await db.user.findUnique({ where: { id: user.id } })
            console.log("updated",updatedUser)
            if (!updatedUser) {
                console.log("conedição");
                redirect("/admin/logout");
            }
            user = updatedUser;
        
        } catch (error) {
            console.error("Erro em layout config",error)
            redirect("/admin/logout")
        }

    }

    return (
        <>
            {user.roleId < 2?children:<SemPermissao user={user}/>}
        </>
    )
}

export const revalidate = 0;


