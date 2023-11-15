import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/db/connector";



// Define the GET request handler function
export async function GET(req: NextRequest) {
    // Check if the database instance has been initialized
    revalidatePath(req.nextUrl.basePath)

    const dataAtual = new Date();
    dataAtual.setUTCHours(0, 0, 0, 0);

    // Perform a database query to retrieve all items from the "items" table
    const items = await db.alertas.findMany({
        where: {
            hora: {
                gt: dataAtual.toISOString()
            }
        },
        orderBy: {
            id: 'desc'
        }
    });


    // Return the items as a JSON response with status 200
    return new Response(JSON.stringify(items), {
        headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
        status: 200,
    });
}

export const revalidate = 0;


export const dynamic = 'force-dynamic'