import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getExpectedAdminToken } from "@/lib/admin-auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only guard /admin/* — let /admin/login pass through
  if (!pathname.startsWith("/admin") || pathname.startsWith("/admin/login")) {
    return NextResponse.next()
  }

  const token = request.cookies.get("admin_token")?.value
  const expectedToken = await getExpectedAdminToken()

  if (!token || token !== expectedToken) {
    const loginUrl = new URL("/admin/login", request.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
