const ADMIN_SESSION_KEY = "admin-session"
const DEFAULT_ADMIN_SECRET = "fallback-dev-secret-change-in-production"

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
}

export async function getExpectedAdminToken(): Promise<string> {
  const secret = process.env.ADMIN_SECRET ?? DEFAULT_ADMIN_SECRET
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(ADMIN_SESSION_KEY)
  )

  return toHex(signature)
}
