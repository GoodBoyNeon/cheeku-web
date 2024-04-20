import axios from "axios";

import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const DISCORD_TOKEN_URL = "https://discord.com/api/oauth2/token";
const DISCORD_USER_GUILD_INFO_URL = `https://discord.com/api/users/@me/guilds/${process.env.GUILD_ID}/member`;

export async function GET(req: Request) {
  const code = new URLSearchParams(req.url.split("?")[1]).get("code");

  if (!code) {
    throw new Error("No code found");
  }

  const accessTokenExchangeRes = await axios.post(
    DISCORD_TOKEN_URL,
    {
      grant_type: "authorization_code",
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      code,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  const userRes = await axios.get(DISCORD_USER_GUILD_INFO_URL, {
    headers: {
      Authorization: `Bearer ${accessTokenExchangeRes.data.access_token}`,
    },
  });

  if (!userRes.data.roles.includes(process.env.REQ_ROLE_ID)) {
    redirect("/authorize/failed");
  }

  const token = await new SignJWT({
    sub: userRes.data.user.id,
  })
    .setIssuedAt()
    .setIssuer("callback")
    .setProtectedHeader({ alg: "HS256" })
    .setAudience("auth")
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  cookies().set("token", token);

  redirect(process.env.CLIENT_REDIRECT_URL ?? "");
}
