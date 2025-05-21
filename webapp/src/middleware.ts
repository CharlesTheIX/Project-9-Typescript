import * as gbl from "@/globals";
import { NextRequest, NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

const handleApiRoutes = (request: NextRequest): NextResponse | null => {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized: Missing Bearer token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const token = authHeader.split(" ")[1];
  const validToken = process.env.API_TOKEN;

  if (token !== validToken) {
    return new NextResponse(JSON.stringify(gbl.response_FORBIDDEN), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  return null;
};

export default clerkMiddleware(async (auth, request) => {
  const { pathname } = request.nextUrl;
  console.log("clerk middleware");

  if (isPublicRoute(request)) return NextResponse.next();

  if (pathname.startsWith("/api")) {
    const apiRouteResponse = handleApiRoutes(request);
    if (apiRouteResponse) return apiRouteResponse;
  }

  await auth.protect();
});

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"],
};
// export function middleware(request: NextRequest) {
//   console.log("Middleware triggered:", request.nextUrl.pathname);
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/countries"],
// };
