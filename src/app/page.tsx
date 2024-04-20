"use server";

import { verifyUser } from "@/lib/verifyUser";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await verifyUser(cookies().get("token"));

  if (user) {
    return redirect("/send");
  }
  return redirect("/authorize");
}
