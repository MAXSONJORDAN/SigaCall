import { HomePage } from "@/components/templates/HomePage";
import { db } from "@/db/connector";

export default async function Home() {

  const destinosAtendimento = await db.destinoAtendimento.findMany();
  const shotcuts = await db.shotcuts.findMany();


  return (
    <><HomePage destinos={destinosAtendimento} shotcuts={shotcuts} socketUrl={process.env.SOCKETURL} /></>
  )
}
