import { LoginPage } from "@/components/templates/LoginPage";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers'

export default function Home() {


  const cookieStore = cookies();

  const token = cookieStore.get("token");

  if (token) {
    redirect("/admin")
  } else {
    return (
      <LoginPage />
    )
  }
}


export const revalidate = 0;