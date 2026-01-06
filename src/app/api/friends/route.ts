import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.SERVER_API_URL}/friends`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  console.log("res", res);

  if (!res.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(await res.json());
}
