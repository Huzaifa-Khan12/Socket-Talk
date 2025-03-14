import React, { useEffect, useRef } from "react";
import Message from "./Message";
import MessageSkeleton from "../skeletons/MessageSkeleten";
import useGetMessages from "../../hooks/useGetMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();

  //to make sure the last message displayed on the screen (auto scroll to last message)
  const lastMessageRef = useRef();

  //this defines whenever the messages are updated/state changes, call the useEffect with a 100 millisecond delay
  //the delay is to make sure the useEffect gets called after the Component reload
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      ;{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
