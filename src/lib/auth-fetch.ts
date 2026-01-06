import { cookies } from "next/headers";

const API_URL = "http://localhost:3000/api";

export async function authFetch(input: string, init?: RequestInit) {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  // 1️⃣ Gọi API gốc
  let res = await fetch(`${API_URL}${input}`, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Cookie: cookieHeader,
    },
    credentials: "include",
    cache: "no-store",
  });

  // 2️⃣ Nếu accessToken hết hạn
  if (res.status === 401) {
    console.log("res", res);
    const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Cookie: cookieHeader,
      },
      credentials: "include",
    });

    // 3️⃣ Refresh fail → logout
    if (!refreshRes.ok) {
      throw new Error("UNAUTHORIZED");
    }

    const newCookieStore = await cookies();

    const newCookieHeader =  newCookieStore
      .getAll()
      .map(c => `${c.name}=${c.value}`)
      .join("; ");

    // 4️⃣ Retry request ban đầu
    res = await fetch(`${API_URL}${input}`, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        Cookie: newCookieHeader,
      },
      credentials: "include",
      cache: "no-store",
    });
  }

  return res;
}
