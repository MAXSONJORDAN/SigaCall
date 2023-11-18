import { EditShotcutsPage } from "@/components/templates/EditShotcutsPage";
import { db } from "@/db/connector";
import { cache } from 'react'

export default async function Home({ params }: any) {

  const id = parseInt(params.id);
  const shotcut = await db.shotcuts.findUnique({ where: { id } })

  return (
    <><EditShotcutsPage shotcut={shotcut} /></>
  )
}

export const revalidate = 0