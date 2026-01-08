"use client";

import { useState } from "react";

import MessageBox from "./MessageBox";


const Body = ({ initialMessages = [] }) => {
  const [messages, setMessages] = useState(initialMessages);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div className="pt-24" />
    </div>
  );
};

export default Body;
