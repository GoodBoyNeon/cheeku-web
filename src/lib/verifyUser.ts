import { jwtVerify } from "jose";

export async function verifyUser(cookie: unknown): Promise<string | null> {
  if (
    !cookie ||
    typeof cookie !== "object" ||
    !("value" in cookie) ||
    typeof cookie?.value !== "string"
  )
    return null;

  const jwt = await jwtVerify(
    cookie.value,
    new TextEncoder().encode(process.env.JWT_SECRET),
    {
      issuer: "callback",
      audience: "auth",
    },
  ).catch((e) => {
    console.log(e);
    return null;
  });

  return jwt?.payload.sub ?? null;
}
