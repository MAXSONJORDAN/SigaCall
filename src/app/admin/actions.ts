'use server'
import { cookies } from "next/headers"
import { redirect} from "next/navigation";



export async function logout() {


    // mutate data
    // revalidate cache
    cookies().delete('token')
    redirect("/admin?logout=true")
    

}