import { EditTratamentoPage } from "@/components/templates/EditTratamentoPage";
import { db } from "@/db/connector";
import { cache } from 'react'
 
export const revalidate = 1

export default async function Home({ params }: any) {

  const id = parseInt(params.id);
  const tratamento = await db.tratamento.findUnique({ where: { id } })

  return (
    <><EditTratamentoPage tratamento={tratamento} /></>
  )
}
