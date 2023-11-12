import { EditUserPage } from "@/components/templates/EditUserPage";
import { db } from '@/db/connector';
import { cache } from 'react'
 
export const revalidate = 1

export default async function Home({ params }: any) {

  const tratamentos = await db.tratamento.findMany();
  const roles = await db.role.findMany();


  const id: any = parseInt(params.id);
  const user = await db.user.findUnique({ where: { id } })
  const userToEdit = { ...user };
  delete userToEdit.senha;

  return (
    <><EditUserPage user={userToEdit} tratamentos={tratamentos} roles={roles} /></>
  )
}
