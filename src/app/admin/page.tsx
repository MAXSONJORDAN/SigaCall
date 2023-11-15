import { HomePage } from "@/components/templates/HomePage";
import { db } from "@/db/connector";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

export default async function Home(props) {
  console.log("props aqui", props)
  const destinosAtendimento = await db.destinoAtendimento.findMany();
  const shotcuts = await db.shotcuts.findMany();

  const token: any = cookies().get("token")?.value
  const user = jwt.decode(token);

  return (
    <><HomePage user={user} destinos={destinosAtendimento} shotcuts={shotcuts} socketUrl={process.env.SOCKETURL} /></>
  )
}
