import * as gbl from "@/globals";
import { NextRequest, NextResponse } from "next/server";
import { ClerkMiddlewareAuth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(gbl.publicRoutes);
const isSignedInRoute = createRouteMatcher(gbl.signedInRoutes);

export default clerkMiddleware(async (auth: ClerkMiddlewareAuth, request: NextRequest) => {
  const { userId } = await auth();

  if (userId && isSignedInRoute(request)) {
    const url = new URL("/dashboard", process.env.BASE_URL);
    return NextResponse.redirect(url);
  }

  if (isPublicRoute(request)) return NextResponse.next();

  await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)"
  ]
};
