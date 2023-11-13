import { EditShotcutsPage } from "@/components/templates/EditShotcutsPage";
import { db } from "@/db/connector";
import { cache } from 'react'

export const revalidate = 1

export default async function Home({ params }: any) {

  const id = parseInt(params.id);
  const shotcut = await db.shotcuts.findUnique({ where: { id } })

  return (
    <><EditShotcutsPage shotcut={shotcut} /></>
  )
}
