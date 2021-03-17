import React from "react";
import Player from "../components/Player";
import Chat from "../components/Chat";
import { useParams } from "react-router-dom";
import { Col, Row } from "antd";

const Room = () => {
  const params = useParams<any | null>();
  const url = decodeURIComponent(params.url);

  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={12}>
          <Player url={url} />
        </Col>
        <Col span={12}>
          <Chat />
        </Col>
      </Row>
    </>
  );
};

export default Room;
