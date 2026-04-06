import { NextResponse } from "next/server"
import { createHmac } from "crypto"

function getExpectedToken(): string {
  const secret = process.env.ADMIN_SECRET ?? "fallback-dev-secret-change-in-production"
  return createHmac("sha256", secret).update("admin-session").digest("hex")
}

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 })
    }

    if (password !== adminPassword) {
      // Constant-time-ish delay to slow brute force
      await new Promise((r) => setTimeout(r, 500))
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    const token = getExpectedToken()
    const response = NextResponse.json({ ok: true })

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    })

    return response
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.delete("admin_token")
  return response
}
