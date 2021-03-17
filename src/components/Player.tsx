import React, { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import socket from "../socket/socket";
import secondsToHms from "../lib/seconds-to-hms"
import "./Player.css"

import { Slider } from "antd";

const Player = ({ url, roomId }: any) => {
  const refContainer = useRef<ReactPlayer>(null);

  const [refState, setRefState] = useState<ReactPlayer>();
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [play, setPlay] = useState<boolean>(false);

  useEffect(() => {
    const reactPlayerRef = refContainer.current;
    if (reactPlayerRef) {
      setRefState(reactPlayerRef);
    }
  }, [refContainer, refState]);

  const handleDuration = (state: number): void => {
    setDuration(state);
  };

  // Event emitters
  const handleProgress = (state: any): void => {
    socket.emit("progress", state.playedSeconds, roomId);
    setProgress(state.playedSeconds);
  };

  const handlePause = (): void => {
    socket.emit("pause", roomId);
  };

  const handlePlay = (): void => {
    socket.emit("play", roomId);
  };

  const handleStart = (): void => {
    socket.emit("start", roomId);
  };

  const handleSliderChange = (value: number) => {
    socket.emit("seek", value, roomId);
    refState?.seekTo(value);
  };

  // Event listeners
  socket.on("playing", () => {
    setPlay(true);
  });

  socket.on("starting", () => {
    setPlay(true);
  });

  socket.on("paused", () => {
    setPlay(false);
  });

  socket.on("progressing", (state: number) => {
    setProgress(state);
  });

  socket.on("seeking", (state: number) => {
    refState?.seekTo(state);
  });

  return (
    <>
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          ref={refContainer}
          url={url}
          playing={play}
          controls={false}
          width="100%"
          height="100%"
          onStart={handleStart}
          onProgress={handleProgress}
          onPause={handlePause}
          onPlay={handlePlay}
          onDuration={handleDuration}
        />
      </div>
      <div>
        {" "}
        <Slider
          value={progress}
          max={duration}
          onChange={handleSliderChange}
        ></Slider>
        <p>{progress === 0 ? "Control player seek here" : ""}</p>
        {secondsToHms(progress)}
      </div>
    </>
  );
};

export default Player;
