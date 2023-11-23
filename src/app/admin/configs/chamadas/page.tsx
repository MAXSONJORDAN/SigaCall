import { ChamadasPage } from "@/components/templates/ChamadasPages";
import { db } from "@/db/connector";

export const revalidate = 0;
export default async function Home() {
  

  const chamadasQuery = await db.chamadasConfigs.findMany();
  console.log(chamadasQuery);

  let chamadasConfigs:any = {};
  chamadasQuery.map((item)=>{
    chamadasConfigs[item.name] = item.value;
  })

  return (
    <><ChamadasPage configs={chamadasConfigs} /></>
  )
}


