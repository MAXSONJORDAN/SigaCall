import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { createHash } from "crypto";
import { db } from "@/db/connector";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';


export async function POST(req: NextRequest) {



    revalidatePath(req.nextUrl.basePath)

    const data = await req.json();

    const { email, senha } = data;


    const user: any = await db.user.findUnique({ where: { email: email } }).catch((err) => {
        console.error(err);
        return "erro";;
    })

    console.log(email, "Tentando autenticar.", user);

    if (user === "erro") {
        return new Response(JSON.stringify({ message: "Erro desconhecido!" }), {
            headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
            status: 500,
        });
    }

    const dataToken = { ...user }
    delete dataToken.senha;

    const token = jwt.sign(dataToken, "CB45jmph@@", { expiresIn: '9h' })


    if (!user) {
        return new Response(JSON.stringify({ message: "Usuário ou senha inválidos." }), {
            headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
            status: 401,
        });
    }



    // Criar o hash da senha digitada
    const hashDigitado = createHash('sha256').update(senha).digest('hex');

    // Comparar os hashes
    if (hashDigitado === user?.senha) {
        cookies().set("token", token);
        return new Response(JSON.stringify({ message: "Credenciais válidas. Login bem-sucedido!", token: token }), {
            headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
            status: 200,
        });
    } else {
        return new Response(JSON.stringify({ message: "Credenciais não correspondem. Login falhou." }), {
            headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
            status: 401,
        });
    }
}


export const dynamic = 'force-dynamic'