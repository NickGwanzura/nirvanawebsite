import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createHmac } from "crypto"

function getExpectedToken(): string {
  const secret = process.env.ADMIN_SECRET ?? "fallback-dev-secret-change-in-production"
  return createHmac("sha256", secret).update("admin-session").digest("hex")
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only guard /admin/* — let /admin/login pass through
  if (!pathname.startsWith("/admin") || pathname.startsWith("/admin/login")) {
    return NextResponse.next()
  }

  const token = request.cookies.get("admin_token")?.value

  if (!token || token !== getExpectedToken()) {
    const loginUrl = new URL("/admin/login", request.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
