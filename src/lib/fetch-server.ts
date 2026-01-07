import { cookies } from "next/headers";
import { redirect } from "next/navigation";

let refreshTokenPromise: Promise<string> | null = null;

async function getNewToken(refreshToken: string) {
  try {
    const res = await fetch(`${process.env.SERVER_API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Refresh token expired");

    const data = await res.json();
    return data.accessToken;
  } catch (error) {
    throw error;
  }
}

export async function fetchServer(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const baseUrl = process.env.SERVER_API_URL;

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  };

  let response = await fetch(`${baseUrl}${url}`, config);

  if (response.status === 401) {
    if (!refreshToken) {
      redirect("/");
    }

    try {
      if (!refreshTokenPromise) {
        refreshTokenPromise = getNewToken(refreshToken);
      }

      const newAccessToken = await refreshTokenPromise;

      refreshTokenPromise = null;

      config.headers["Authorization"] = `Bearer ${newAccessToken}`;
      response = await fetch(`${baseUrl}${url}`, config);
    } catch (error) {
      console.error("fetch server error: ", error);
      refreshTokenPromise = null;
      redirect("/");
    }
  }

  return response;
}
