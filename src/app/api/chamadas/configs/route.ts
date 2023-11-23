import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/db/connector";



export async function POST(req: NextRequest) {
    // Check if the database instance has been initialized
    revalidatePath(req.nextUrl.basePath)


    const data = await req.json();

    const configs = await db.chamadasConfigs.findMany();
    configs.map((config) => {
        config.value = data[config.name];
    })

    for (let i = 0; i < configs.length; i++) {
        const config = configs[i];
        await db.chamadasConfigs.update({ data: config, where: { id: config.id } })

    }
   
    return new Response(JSON.stringify({ message: "Atualizado com sucesso!" }), {
        headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
        status: 200,
    });

}


export const dynamic = 'force-dynamic'