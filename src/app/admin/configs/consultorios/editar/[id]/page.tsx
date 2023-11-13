import { EditConsultoriosPage } from "@/components/templates/EditConsultoriosPage";
import { db } from "@/db/connector";
import { cache } from 'react'
 



export default async function Home({ params }: any) {

  const id = parseInt(params.id);
  const consultorio = await db.consultorio.findUnique({ where: { id } })

  return (
    <><EditConsultoriosPage consultorio={consultorio} /></>
  )
}

export const revalidate = 0