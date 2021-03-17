import React, { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import socket from "../socket/socket";

const Player = ({ url }: any) => {
  const refContainer = useRef<ReactPlayer>(null);

  const [refState, setRefState] = useState<ReactPlayer>();
  const [progress, setProgress] = useState<number>(0);
  const [play, setPlay] = useState<boolean>(false);

  useEffect(() => {
    const reactPlayerRef = refContainer.current;
    if (reactPlayerRef) {
      setRefState(reactPlayerRef);
    }
  }, [refContainer]);

  // Event emitters
  const handleProgress = (state: any): void => {
    socket.emit("progress", state.playedSeconds);
  };

  const handlePause = (): void => {
    socket.emit("pause");
  };

  const handlePlay = (): void => {
    socket.emit("play");
  };

  // Event listeners
  socket.on("playing", () => {
    setPlay(true);
  });

  socket.on("paused", () => {
    setPlay(false);
  });

  socket.on("progressing", (state: number) => {
    if (progress < state - 3 || progress > state + 3) {
      refState?.seekTo(state);
    }
    setProgress(state);
  });

  return (
    <>
      <ReactPlayer
        ref={refContainer}
        url={url}
        playing={play}
        controls={true}
        onProgress={handleProgress}
        onPause={handlePause}
        onPlay={handlePlay}
      />
    </>
  );
};

export default Player;
