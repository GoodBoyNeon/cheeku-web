import { createClient } from "redis";

const client = createClient({
  password: process.env.DB_PASSWORD,
  socket: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
  },
});

client.on("error", (e) => console.error("[Redis Error]:", e));

const clientPromise = client.connect();

export default clientPromise;
