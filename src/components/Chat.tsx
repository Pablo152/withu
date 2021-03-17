import { Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import socket from "../socket/socket";

const Chat = ({roomId}: any) => {
  const [message, setMessage] = useState<string>("");
  const [sentMessages, setSentMessages] = useState<Array<any>>([]);

  const handleMessage = (element: any) => {
    setMessage(element.target.value);
  };

  const handleSendMessage = () => {
    socket.emit("message", message, roomId);
    if (message.trim() !== "") {
      let newArr = Array.from(sentMessages);
      const key = Math.random().toString(36).substr(2, 5);
      const time = new Date();
      const timeFormattedString = `${time.getHours()}:${time.getMinutes()}`
      newArr.push({
        message: message,
        type: "client",
        time: timeFormattedString,
        key,
      });
      setMessage("");
      setSentMessages(newArr);
    }
  };

  socket.on("messaging", (data: string, key: string, time: string) => {
    console.log(data);
    let newArr = Array.from(sentMessages);
    newArr.push({
      message: data,
      type: "socket",
      time,
      key,
    });
    setSentMessages(newArr);
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          minHeight:422.5,
          maxHeight: 422.5,
          overflowY: "auto",
        }}
      >
        <div>
          {sentMessages?.length === 0 ? <h4>Chat here! :)</h4> : sentMessages?.map((message) => {
            return (
              <div
                style={{
                  float: message.type === "client" ? "right" : "left",
                  backgroundColor:
                    message.type === "client" ? "#f1f1f1" : "gray",
                  borderRadius: 5,
                  padding: 5,
                  margin: 10,
                  width: 500,
                  maxHeight: 400,
                  overflowY: "auto",
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
                  {message.time}
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
        </div>
      </div>
      <div>
        <TextArea
          style={{
            borderRadius: 4
          }}
          value={message}
          onPressEnter={handleSendMessage}
          onChange={handleMessage}
          rows={2}
        />
        <Button
          onClick={handleSendMessage}
          style={{ float: "right" }}
          type="primary"
        >
          Send
        </Button>
      </div>
    </>
  );
};

export default Chat;
