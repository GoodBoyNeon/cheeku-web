import { jwtVerify } from "jose";

export async function verifyUser(cookie: unknown): Promise<string | null> {
  console.log(typeof cookie);
  if (
    !cookie ||
    typeof cookie !== "object" ||
    !("value" in cookie) ||
    typeof cookie?.value !== "string"
  )
    return null;
  console.log("AAA");

  const jwt = await jwtVerify(
    cookie.value,
    new TextEncoder().encode(process.env.JWT_SECRET),
    {
      issuer: "callback",
      audience: "auth",
    },
  ).catch((e) => {
    console.log("errpr");
    console.log(e);
    return null;
  });

  return jwt?.payload.sub ?? null;
}
