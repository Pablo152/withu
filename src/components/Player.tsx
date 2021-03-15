import React, { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";

import { Button, Slider, Row, Col } from "antd";

const Player = ({ url }: any) => {
  const refContainer = useRef<ReactPlayer>(null);
  const [refState, setRefState] = useState<ReactPlayer>();
  const [playing, setPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    const reactPlayerRef = refContainer.current;
    if (reactPlayerRef) {
      setRefState(reactPlayerRef);
    }
  }, [refContainer]);

  const handleProgress = (state: any): void => {
    setProgress(state.playedSeconds);
  };

  const handleDuration = (state: any): void => {
    setDuration(state);
  };

  const handleSliderChange = (value: number): void => {
    refState?.seekTo(value);
  };

  const secondsToHms = (d: number) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  };

  return (
    <>
      <Row>
        <ReactPlayer
          style={{ pointerEvents: "none" }}
          ref={refContainer}
          playing={playing}
          url={url}
          controls={false}
          onProgress={handleProgress}
          onDuration={handleDuration}
        />
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col span={8}>
          {" "}
          <Slider
            value={progress}
            max={duration}
            onChange={handleSliderChange}
          ></Slider>
        </Col>
        <Col span={4}>
          {" "}
          <Button type="primary" onClick={() => setPlaying(!playing)}>
            {!playing ? "|> Play" : "[] Pause"}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>{secondsToHms(progress)}</Col>
      </Row>
    </>
  );
};

export default Player;
