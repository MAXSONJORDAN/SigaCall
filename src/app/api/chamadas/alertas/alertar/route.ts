import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/db/connector";



export async function POST(req: NextRequest) {
    // Check if the database instance has been initialized
    revalidatePath(req.nextUrl.basePath)
    const data = await req.json();
    let alerta = { identificador: data.identificador, mensagem: data.mensagem, userId: data.userId, hora: new Date() }
    const configs = await db.chamadasConfigs.findMany();

    let moreItens = {};
    for (let i = 0; i < configs.length; i++) {
        const config = configs[i];
        moreItens[config.name] = config.value;
    }


    const solicitanteQuery = await db.user.findUnique({ where: { id: data.userId } });

    const solicitante = solicitanteQuery?.nomeTratamento;

    moreItens['mensagem'] = moreItens['mensagem']
        .replaceAll("{solicitante}", solicitante)

    const response = await db.alertas.create({ data: alerta }).then(() => {

        return new Response(JSON.stringify({ message: "Alerta enviado com sucesso!" }), {
            headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
            status: 200,
        });
    }).catch((err) => {
        console.error(err);
        return new Response(JSON.stringify({ message: "Falha no envio do alerta!" }), {
            headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
            status: 400,
        });
    })

    console.log("ALERTA", alerta)
    if (response.status === 200)
        io.emit("alertar", { ...alerta, ...moreItens })

    return response;
}

export const dynamic = 'force-dynamic'