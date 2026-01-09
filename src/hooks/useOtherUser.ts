import { useMemo } from "react";

import { useAuthStore } from "@/stores/useAuthStore";
import { Conversation } from "@/types/conversation";

const useOtherUser = (conversation: Conversation) => {
  const { user } = useAuthStore();

  const otherUser = useMemo(() => {
    const currentUserId = user?._id;
    const otherUser = conversation.participants.filter(
      (user) => user._id !== currentUserId
    );

    return otherUser[0];
  }, [user, conversation]);

  return otherUser;
};

export default useOtherUser;
