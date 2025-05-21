import crypto from "crypto";
import * as gbl from "@/globals";
import { NextRequest, NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const decrypt = (token: string): string => {
  try {
    const [ivBase64, encryptedData] = token.split(":");
    const iv = Buffer.from(ivBase64, "base64");
    const decipher = crypto.createDecipheriv("aes-256-ccm", Buffer.from(process.env.CRYPTO_SECRET!), iv);
    const decrypted = decipher.update(encryptedData, "base64", "utf8");
    return `${decrypted}${decipher.final("utf8")}`;
  } catch (error: any) {
    return "";
  }
};

const isPublicRoute = createRouteMatcher(gbl.publicRoutes);

const handleApiRoutes = (request: NextRequest): NextResponse | null => {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/api")) return null;

  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new NextResponse(
      JSON.stringify({ ...gbl.response_UNAUTHORISED, message: "Unauthorised: Missing Bearer token." }),
      {
        status: gbl.status.UNAUTHORISED,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  const token = authHeader.split(" ")[1];
  const validToken = process.env.LOCAL_API_AUTH_TOKEN;
  const decryptedToken = decrypt(token);

  if (decryptedToken !== validToken) {
    return new NextResponse(JSON.stringify({ ...gbl.response_UNAUTHORISED, message: "Unauthorised: Invalid Token." }), {
      status: gbl.status.UNAUTHORISED,
      headers: { "Content-Type": "application/json" }
    });
  }

  return null;
};

export default clerkMiddleware(async (auth, request) => {
  if (isPublicRoute(request)) return NextResponse.next();

  const apiRouteResponse = handleApiRoutes(request);
  if (apiRouteResponse) return apiRouteResponse;

  await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)"
  ]
};
