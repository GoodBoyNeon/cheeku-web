import { redirect } from "next/navigation";

export async function GET() {
  const url = process.env.OAUTH_URL;
  if (!url) throw new Error("redirect url not found");
  redirect(url);
}
