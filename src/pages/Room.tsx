import React from "react";
import Player from "../components/Player";
import { useParams } from "react-router-dom";

const Room = () => {
  const params = useParams<any | null>();
  const url = decodeURIComponent(params.url);

  return (
    <>
      <Player url={url} />
    </>
  );
};

export default Room;
