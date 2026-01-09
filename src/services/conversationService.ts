import { fetchServer } from "@/lib/fetch-server";

export async function getConversations() {
  const res = await fetchServer(`/conversations`);

  if (!res.ok) {
    return [];
  }

  const data = await res.json();

  return data;
}

export async function getConversationById(conversationId: string) {
  const res = await fetchServer(`/conversations/${conversationId}`);

  if (!res.ok) {
    return [];
  }

  const data = await res.json();

  return data;
}
