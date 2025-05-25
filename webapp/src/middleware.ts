import { NextRequest, NextResponse } from "next/server";
import getUserByClerkId from "./functions/users/getUserByClerkId";
import { ClerkMiddlewareAuth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const signedInRoutes: string[] = ["/sign-in(.*)", "/sign-up(.*)"];
const adminRoutes: string[] = ["/admin/:path*", "/users/:path*", "/countries/create"];
const publicRoutes: string[] = ["/", "/sign-in(.*)", "/sign-up(.*)", "/cookies", "/api/:path*"];

const isAdminRoute = createRouteMatcher(adminRoutes);
const isPublicRoute = createRouteMatcher(publicRoutes);
const isSignedInRoute = createRouteMatcher(signedInRoutes);

export default clerkMiddleware(async (auth: ClerkMiddlewareAuth, request: NextRequest) => {
  const { userId } = await auth();

  if (userId && isSignedInRoute(request)) return NextResponse.redirect(new URL("/dashboard", process.env.BASE_URL));

  if (isPublicRoute(request)) return NextResponse.next();

  if (userId && isAdminRoute(request)) {
    const userResponse = await getUserByClerkId(userId);
    if (userResponse.error || userResponse.data.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", process.env.BASE_URL));
    }

    return NextResponse.next();
  }

  await auth.protect();
});

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)"],
};
