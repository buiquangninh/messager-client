import { fetchServer } from "@/lib/fetch-server";

export async function getFriends() {
  const res = await fetchServer(`/friends`);

  if (!res.ok) {
    return [];
  }

  const data = await res.json();

  return data.friends;
}
