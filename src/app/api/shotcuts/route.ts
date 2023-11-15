import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from '@/db/connector';
import { createHash } from "crypto";



// Let's initialize it as null initially, and we will assign the actual database instance later.
// let db: Database<IDatabase, Statement> | null = null;

// Define the GET request handler function
export async function GET(req: NextRequest) {

  // Check if the database instance has been initialized
  revalidatePath(req.nextUrl.basePath)

  console.log(req.nextUrl.basePath)

  // await db.exec("insert into items ('name','description','img') values('"+req.nextUrl.searchParams.get("id")+"','teste','teste.img')")

  // Perform a database query to retrieve all items from the "items" table
  //   await db.user.create({data:{email:"admin","password":createHash("sha256").}})
  let items: any[] = await db.shotcuts.findMany();


  // Return the items as a JSON response with status 200
  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
    status: 200,
  });
}


export async function POST(req: NextRequest) {

  revalidatePath(req.nextUrl.basePath)
  const data = await req.json();

  const response = await db.shotcuts.create({
    data
  }).then(() => {

    return new Response(JSON.stringify({ message: "Shotcut cadastrado com sucesso!" }), {
      headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
      status: 200,
    });

  }).catch((err) => {
    console.error("caiu aqui", err);

    return new Response(JSON.stringify({ message: "Falha ao cadastrar o shotcut;" }), {
      headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
      status: 400,
    });
  })

  return response;

}


export async function PATCH(req: NextRequest) {

  revalidatePath(req.nextUrl.basePath)
  const data = await req.json();

  if (data.senha) {
    data['senha'] = createHash('sha256').update(data.senha).digest('hex')
  }


  const response = await db.shotcuts.update({
    data: data, where: { id: data.id }
  }).then(() => {

    // Return the items as a JSON response with status 200
    return new Response(JSON.stringify({ message: "Shotcut atualizado com sucesso!" }), {
      headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
      status: 200,
    });

  }).catch((err) => {
    console.error("caiu aqui", err);

    return new Response(JSON.stringify({ message: "Falha ao atualizar o shotcut." }), {
      headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
      status: 400,
    });
  })

  return response;
}

export const dynamic = 'force-dynamic'