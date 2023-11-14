import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from '@/db/connector';

export async function GET(req: NextRequest) {

  // Check if the database instance has been initialized
  revalidatePath(req.nextUrl.basePath)

  console.log(req.nextUrl.basePath)
  let items: any[] = await db.destinoAtendimento.findMany();


  // Return the items as a JSON response with status 200
  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
    status: 200,
  });
}


export async function POST(req: NextRequest) {

  revalidatePath(req.nextUrl.basePath)
  const data = await req.json();

  const response = await db.destinoAtendimento.create({
    data
  }).then(() => {

    return new Response(JSON.stringify({ message: "Consultório cadastrado com sucesso!" }), {
      headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
      status: 200,
    });

  }).catch((err) => {
    console.error("caiu aqui", err);

    return new Response(JSON.stringify({ message: "Falha ao cadastrar o consultório." }), {
      headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
      status: 400,
    });
  })

  return response;

}


export async function PATCH(req: NextRequest) {

  revalidatePath(req.nextUrl.basePath)
  const data = await req.json();


  const response = await db.destinoAtendimento.update({
    data: data, where: { id: data.id }
  }).then(() => {

    // Return the items as a JSON response with status 200
    return new Response(JSON.stringify({ message: "Consultório atualizado com sucesso!" }), {
      headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
      status: 200,
    });

  }).catch((err) => {

    return new Response(JSON.stringify({ message: "Falha ao atualizar o consultório." }), {
      headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
      status: 400,
    });
  })

  return response;
}