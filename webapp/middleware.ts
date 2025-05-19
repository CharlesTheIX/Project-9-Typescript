import * as gbl from '@/globals';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api')) {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new NextResponse(JSON.stringify({ message: 'Unauthorized: Missing Bearer token' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const token = authHeader.split(' ')[1];

    const validToken = process.env.API_TOKEN;
    if (token !== validToken) return new NextResponse(JSON.stringify(gbl.response_FORBIDDEN));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
