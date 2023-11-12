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
  const params = req.nextUrl.searchParams;

  const id = params.get("id") ? parseInt(<string>params.get("id")) : undefined;


  // await db.exec("insert into items ('name','description','img') values('"+req.nextUrl.searchParams.get("id")+"','teste','teste.img')")

  // Perform a database query to retrieve all items from the "items" table
  //   await db.user.create({data:{email:"admin","password":createHash("sha256").}})
  let item: any = await db.user.findUnique({ where: { id: id } });
  item.role = (await db.role.findUnique({ where: { id: item.roleId } }))?.name
  item.tratamento = (await db.tratamento.findUnique({ where: { id: item.tratamentoId } }))?.identificador

  // Return the items as a JSON response with status 200
  return new Response(JSON.stringify(item), {
    headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
    status: 200,
  });
}


export async function PUT(req: NextRequest) {

  revalidatePath(req.nextUrl.basePath)
  const data = await req.nextUrl.searchParams;
  console.log(data);
  const status = data.get('status');
  // await db.exec("insert into items ('name','description','img') values('"+req.nextUrl.searchParams.get("id")+"','teste','teste.img')")

  // Perform a database query to retrieve all items from the "items" table
  // console.log("antes")
  // await db.user.update({ data: { isActive: status ?? null == 1 ? true : false }, where: { id } }).catch((err) => {
  //   console.error("caiu aqui", err);

  //   return new Response(JSON.stringify({ message: "Falha ao cadastrar o usuário;" }), {
  //     headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
  //     status: 400,
  //   });
  // })

  console.log("depois")

  // const items = await db.user.findMany();

  // Return the items as a JSON response with status 200
  return new Response(JSON.stringify({ message: "Usuário cadastrado com sucesso!" }), {
    headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
    status: 200,
  });
}