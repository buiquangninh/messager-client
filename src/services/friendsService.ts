export async function getFriends() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/friends`, {
    cache: "no-store",
  });

  return res.json();
}
