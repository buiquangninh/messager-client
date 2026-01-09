import Sidebar from "@/app/components/SideBar/Sidebar";
import ConversationList from "./components/ConversationList";
import { getConversations } from "@/services/conversationService";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList
          title="Messages"
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
}
