"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import { Conversation } from "@/types/conversation";
import useOtherUser from "@/hooks/useOtherUser";

interface ConversationBoxProps {
  data: Conversation;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const router = useRouter();
  const otherUser = useOtherUser(data);

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data._id}`);
  }, [data, router]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
        w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        p-3 
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        `,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      {data.type === "group" ? (
        <AvatarGroup users={data.participants} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {otherUser.displayName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
