import React from "react";
import ReactVrPlayer from "react-vr-player";

const ReactVRPlayers = () => {
  const sources = [
    // Declare an array of video sources
    {
      url: "https://d8d913s460fub.cloudfront.net/krpanocloud/video/airpano/video-1920x960a-fs.mp4",
      type: "video/mp4",
    },
  ];
  const keys = {
    // If you want to re-define the keys, here are the defaults
    left: "A",
    right: "D",
    up: "W",
    down: "S",
    rotateLeft: "Q",
    rotateRight: "E",
    fullScreen: "F",
    zeroSensor: "Z",
    playPause: " ",
  };
  return (
    <ReactVrPlayer
      sources={sources}
      brand="Some Brand Name"
      title="Some Video Title"
      keys={keys}
    />
  );
};

export default ReactVRPlayers;
