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
      <Row>
        <Col span={12}>
          <Player url={url} />
        </Col>
        <Col
          span={12}
          style={{
            maxHeight: 600,
            overflowY: "scroll",
          }}
        >
          <Chat />
        </Col>
      </Row>
    </>
  );
};

export default Room;
