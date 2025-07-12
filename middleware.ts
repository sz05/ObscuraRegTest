import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("session_token");

  if (!token) {
    alert("Access Denied , Kindly Login");
    return NextResponse.redirect(
      new URL("https://obscura.ccstiet.com", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Dashboard", "/Add", "/Join", "/ThankYou"],
};
