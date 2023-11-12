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
  let items: any[] = await db.user.findMany();
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    items[i].role = (await db.role.findUnique({ where: { id: item.roleId } }))?.name
    items[i].tratamento = (await db.tratamento.findUnique({ where: { id: item.tratamentoId } }))?.identificador
  }

  // Return the items as a JSON response with status 200
  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
    status: 200,
  });
}


export async function POST(req: NextRequest) {

  revalidatePath(req.nextUrl.basePath)
  const data = await req.json();
  console.log("data", data);
  // await db.exec("insert into items ('name','description','img') values('"+req.nextUrl.searchParams.get("id")+"','teste','teste.img')")

  // Perform a database query to retrieve all items from the "items" table
  console.log("antes")
  await db.user.create({
    data: {
      email: data.email,
      nome: data.nome,
      nomeTratamento: data.nomeTratamento,
      senha: createHash('sha256').update(data.senha).digest('hex'),
      tratamentoId: parseInt(data.tratamentoId),
      roleId: parseInt(data.roleId)
    }
  }).catch((err) => {
    console.error("caiu aqui", err);

    return new Response(JSON.stringify({ message: "Falha ao cadastrar o usuário;" }), {
      headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
      status: 400,
    });
  })

  console.log("depois")

  // const items = await db.user.findMany();

  // Return the items as a JSON response with status 200
  return new Response(JSON.stringify({ message: "Usuário cadastrado com sucesso!" }), {
    headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
    status: 200,
  });
}


export async function PATCH(req: NextRequest) {

  revalidatePath(req.nextUrl.basePath)
  const data = await req.json();
  // await db.exec("insert into items ('name','description','img') values('"+req.nextUrl.searchParams.get("id")+"','teste','teste.img')")

  // Perform a database query to retrieve all items from the "items" table
  console.log("antes")
  const novaData: any = {
    id: parseInt(data.id),
    email: data.email,
    nome: data.nome,
    nomeTratamento: data.nomeTratamento,
    tratamentoId: parseInt(data.tratamentoId),
    roleId: parseInt(data.roleId)
  }

  console.log("Nova data", novaData)

  if (data.senha) {
    novaData['senha'] = createHash('sha256').update(data.senha).digest('hex')
  }


  await db.user.update({
    data: novaData, where: { id: novaData.id }
  }).catch((err) => {
    console.error("caiu aqui", err);

    return new Response(JSON.stringify({ message: "Falha ao cadastrar o usuário;" }), {
      headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
      status: 400,
    });
  })

  console.log("Chegou aqui");
  // const items = await db.user.findMany();

  // Return the items as a JSON response with status 200
  return new Response(JSON.stringify({ message: "Usuário atualizado com sucesso!" }), {
    headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
    status: 200,
  });
}

export async function PUT(req: NextRequest) {
  revalidatePath(req.nextUrl.basePath)
  const data = await req.json();
  console.log("data put", data);

  const response = await db.user.update({ data: { isActive: data.status }, where: { id: data.id } }).then(() => {
    return new Response(JSON.stringify({ message: "Status alterado!" }), {
      headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
      status: 200,
    });
  }).catch(() => {
    return new Response(JSON.stringify({ message: "Falha ao alterar status do usuário;" }), {
      headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
      status: 400,
    });
  })

  return response;

}