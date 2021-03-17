import { Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import socket from "../socket/socket";

console.log(socket);

const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const [sentMessages, setSentMessages] = useState<Array<any>>([]);

  const handleMessage = (element: any) => {
    setMessage(element.target.value);
  };

  const handleSendMessage = () => {
    socket.emit("message", message);
    let newArr = Array.from(sentMessages);
    const key = Math.random().toString(36).substr(2, 5)
    newArr.push({
      message: message,
      type: "client",
      key,
    });
    setSentMessages(newArr);
  };

  socket.on("messaging", (data: string, key: string) => {
    console.log(data);
    let newArr = Array.from(sentMessages);
    newArr.push({
      message: data,
      type: "socket",
      key,
    });
    setSentMessages(newArr);
  });

  return (
    <>
      {sentMessages?.map((message) => {
        return (
          <div
            style={{
              float: message.type === "client" ? "right" : "left",
              backgroundColor: message.type === "client" ? "#f1f1f1" : "gray",
              borderRadius: 5,
              padding: 5,
              margin: 10,
              width: 500,
              maxHeight: 400,
              overflowY: "scroll",
            }}
            key={message.key}
          >
            <p
              style={{
                display: "flex",
                color: "gray",
                justifyContent: "flex-start",
                fontSize: 12,
              }}
            >
              13:45
            </p>
            <p
              style={{
                display: "flex",
                color: "black",
                justifyContent: "flex-end",
                fontSize: 15,
              }}
            >
              {message.message}
            </p>
          </div>
        );
      })}

      <TextArea onChange={handleMessage} rows={2} />
      <Button
        onClick={handleSendMessage}
        style={{ float: "right" }}
        type="primary"
      >
        Send
      </Button>
    </>
  );
};

export default Chat;
