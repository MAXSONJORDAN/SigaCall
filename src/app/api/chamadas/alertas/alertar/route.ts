import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/db/connector";



export async function POST(req: NextRequest) {
    // Check if the database instance has been initialized
    revalidatePath(req.nextUrl.basePath)
    const data = await req.json();
    const alerta = { identificador: data.identificador, mensagem: data.mensagem, userId: 1, hora: new Date() }


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

    if (response.status === 200)
        io.emit("alertar", alerta)

    return response;
}