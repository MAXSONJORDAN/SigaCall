import { EditDestinosAtendimentoPage } from "@/components/templates/EditDestinoAtendimentoPage";
import { db } from "@/db/connector";
import { cache } from 'react'




export default async function Home({ params }: any) {

  const id = parseInt(params.id);
  const destino = await db.destinoAtendimento.findUnique({ where: { id } })

  return (
    <><EditDestinosAtendimentoPage destino={destino} /></>
  )
}

export const revalidate = 0