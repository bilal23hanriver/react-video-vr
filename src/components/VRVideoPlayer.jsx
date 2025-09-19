import React, { useEffect, useRef } from "react";
import videojs from "video.js";
// import "video.js/dist/video-js.css";
// import "videojs-vr/dist/videojs-vr.css";

export default function VRVideoPlayer({ src, poster }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    let player;

    const initVRPlayer = async () => {
      // dynamically import the UMD plugin
      await import("videojs-vr/dist/videojs-vr.js");

      if (!videoRef.current) return;

      player = playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        fluid: true,
        poster,
        sources: [{ src, type: "video/mp4" }],
      });
      // Only now call VR plugin

      console.log("Show VR: ", player);
    };

    initVRPlayer();

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [src, poster]);

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered"
        playsInline
      />
    </div>
  );
}
