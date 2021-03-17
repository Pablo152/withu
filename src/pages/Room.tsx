import React, { useEffect } from "react";
import Player from "../components/Player";
import Chat from "../components/Chat";
import { useParams } from "react-router-dom";
import { message, Col, Row, Divider, Button } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import socket from "../socket/socket";

const Room = () => {
  const params = useParams<any | null>();
  const url = decodeURIComponent(params.url);
  const roomId = params.roomId;

  useEffect(() => {
    socket.emit("join-room", roomId);
  });

  const success = () => {
    navigator.clipboard.writeText(window.location.href)
    message.success("Link has been copied to clipboard!");
  };

  return (
    <>
      <Button ghost icon={<UsergroupAddOutlined />} onClick={success}>
        Share!
      </Button>
      <Row>
        <Col span={11}>
          <Player url={url} roomId={roomId} />
        </Col>
        <Divider type="vertical"></Divider>
        <Col span={12}>
          <Chat roomId={roomId} />
        </Col>
      </Row>
    </>
  );
};

export default Room;
