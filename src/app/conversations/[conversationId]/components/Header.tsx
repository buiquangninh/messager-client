"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";

import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import ProfileDrawer from "./ProfileDrawer";
import { Conversation } from "@/types/conversation";
import useOtherUser from "@/hooks/useOtherUser";

const Header = ({ conversation }: { conversation: Conversation }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const otherUser = useOtherUser(conversation);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div
        className="
        bg-white 
        w-full 
        flex 
        border-b
        sm:px-4 
        py-3 
        px-4 
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm
        border-gray-200
      "
      >
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="
            lg:hidden 
            block 
            text-sky-500 
            hover:text-sky-600 
            transition 
            cursor-pointer
          "
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.type === "group" ? (
            <AvatarGroup users={conversation.participants} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.displayName}</div>
            <div className="text-sm font-light text-neutral-500">
              {/* {statusText} */}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="
          text-sky-500
          cursor-pointer
          hover:text-sky-600
          transition
        "
        />
      </div>
    </>
  );
};

export default Header;
