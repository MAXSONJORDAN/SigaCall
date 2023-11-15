import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/db/connector";



export async function POST(req: NextRequest) {
    // Check if the database instance has been initialized
    revalidatePath(req.nextUrl.basePath)


    const data = await req.json();
    const chamada = { destinoAtendimento: data.destinoAtendimento, paciente: data.paciente, userId: 1, hora: new Date() }


    const response = await db.chamadas.create({ data: chamada }).then(() => {

        return new Response(JSON.stringify({ message: "Chamada enviada com sucesso!" }), {
            headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
            status: 200,
        });
    }).catch((err) => {
        console.error(err);
        return new Response(JSON.stringify({ message: "Falha no envio da chamada!" }), {
            headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
            status: 400,
        });
    })

    if (response.status === 200)
        io.emit("chamar", chamada)

    return response;
}


export const dynamic = 'force-dynamic'