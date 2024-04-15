import { NextResponse, type NextRequest } from "next/server";
import { verifyUser } from "./lib/verifyUser";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  const user = await verifyUser(token);

  if (user == null) {
    return NextResponse.redirect(`${process.env.BASE_URL}/authorize`);
  }
  NextResponse.redirect(`${process.env.BASE_URL}/send`);
}

export const config = {
  matcher: "/((?!api|authorize|/|_next/static|_next/image|favicon.ico).*)",
};
