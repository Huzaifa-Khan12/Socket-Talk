//hook to listen to the messages sent by the socket from the message.controller.js sendMessage function
//called in Messages.jsx
import React, { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      //shake animation
      newMessage.shouldShake = true;
      //sound notification
      const sound = new Audio(notificationSound);
      sound.play();

      setMessages([...messages, newMessage]);
    });

    //unmount, clean up funtion
    return () => socket?.off("newMessages");
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
