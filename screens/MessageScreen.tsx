import React from "react";
import messageState, { MessageData } from "@recoil/message";
import Dialog from "@components/atoms/Dialog";
import Toast from "@components/atoms/Toast";

export default function MessageScreen({ message }: { message: MessageData }) {
  const { set: setMessage } = messageState();
  function clear() {
    setMessage(null);
  }

  if (message.mode === "dialiog") {
    return <Dialog message={message.message} onClose={clear} />;
  }
  return <Toast message={message.message} onClose={clear} />;
}
