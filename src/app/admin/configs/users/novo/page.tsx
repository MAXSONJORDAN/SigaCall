import { EditUserPage } from "@/components/templates/EditUserPage";
import { db } from '@/db/connector';

export default async function Home() {

  const tratamentos = await db.tratamento.findMany();
  const roles = await db.role.findMany();

  return (
    <><EditUserPage tratamentos={tratamentos} roles={roles} /></>
  )
}
