import clientPromise from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const database = await clientPromise;
  const logs = await database.hGetAll("logs");

  return NextResponse.json(logs);
}
