"use server";

import clientPromise from "@/lib/database";
import axios from "axios";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function send(formData: FormData) {
  const message = formData.get("message");
  const embedJSON = formData.get("embed-json") as string;

  if (typeof message !== "string") return;

  let userId: string;
  try {
    const user = await jwtVerify(
      cookies()?.get("token")?.value as string,
      new TextEncoder().encode(process.env.JWT_SECRET),
      {
        audience: "auth",
        issuer: "callback",
      },
    );

    if (user === null || !user.payload.sub) {
      redirect("/authorize/failed");
    }
    userId = user.payload.sub;
  } catch (e) {
    redirect("/authorize/failed");
  }

  try {
    const msg = await axios.post(
      `https://discord.com/api/v10/channels/${process.env.CHANNEL_ID}/messages`,
      {
        content: message,
        embeds: embedJSON.trim().length > 0 ? JSON.parse(embedJSON) : undefined,
      },
      {
        headers: {
          Authorization: `Bot ${process.env.TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    const database = await clientPromise;

    await database.hSet("logs", msg.data.id, userId);

    return msg.status === 200;
  } catch (e) {
    console.log(e);
    return false;
  }
}
