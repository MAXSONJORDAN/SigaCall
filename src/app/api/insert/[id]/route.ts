import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from '@/db/connector';



// Let's initialize it as null initially, and we will assign the actual database instance later.
// let db: Database<IDatabase, Statement> | null = null;

// Define the GET request handler function
export async function GET(req: NextRequest) {

  // Check if the database instance has been initialized
  revalidatePath(req.nextUrl.basePath)

  // if (!db) {
  //   console.log("None DB yet");
  //   // If the database instance is not initialized, open the database connection
  //   db = await open({
  //     filename: "./collection.db", // Specify the database file path
  //     driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
  //   });
  // }

  console.log(req.nextUrl.basePath)

  // await db.exec("insert into items ('name','description','img') values('"+req.nextUrl.searchParams.get("id")+"','teste','teste.img')")

  // Perform a database query to retrieve all items from the "items" table


  // await db.user.create({data:{email:"admin","password":createHash("sha256")}})
  const items = await db.user.findMany();

  // Return the items as a JSON response with status 200
  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
    status: 200,
  });
}