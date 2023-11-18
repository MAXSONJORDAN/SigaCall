import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";



// Define the GET request handler function
export async function GET(req: NextRequest) {
  // Check if the database instance has been initialized
  revalidatePath(req.nextUrl.basePath)



  // Perform a database query to retrieve all items from the "items" table
  cookies().delete('token')
  redirect("/admin?logout=true")

  // Return the items as a JSON response with status 200
  return new Response(JSON.stringify({}), {
    headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
    status: 200,
  });
}


export const dynamic = 'force-dynamic'