import { HomePage } from "@/components/templates/HomePage";
import { db } from "@/db/connector";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { redirect } from "next/navigation";

export default async function Home(props) {

  const destinosAtendimento = await db.destinoAtendimento.findMany();
  const shotcuts = await db.shotcuts.findMany();

  const token: any = cookies().get("token")?.value
  if(!token){
    redirect("/admin/logout");
  }
  
  const user: any = jwt.decode(token);
  const updatedUser = await db.user.findUnique({ where: { id: user.id } })


  if (!updatedUser) {
    redirect("/admin/logout");
  }

  return (
    <>
      <HomePage user={updatedUser} destinos={destinosAtendimento} shotcuts={shotcuts} socketUrl={process.env.SOCKETURL} />
    </>
  )
}

export const revalidate = 0;
