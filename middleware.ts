// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/Dashboard", "/Add", "/Join", "/ThankYou"],
// };


// // hehe

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  return response;
}

export const config = {
  matcher: '/:path*', // applies to all routes
};