import { SignJWT } from "jose";

export function generateJwtToken() {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 2; // 2 days

  return new SignJWT({ user: "somevaliduser" })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.SIGNING_KEY));
}
