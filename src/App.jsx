import React from "react";
import VideoPlayer from "./components/VideoPlayer";
import PanoramaVideo from "./components/PanoramaVideo";
// import VRPlayer from "./components/VRPlayerThree";
// import VRVideoPlayer from "./components/VRVideoPlayer";

const SAMPLE_VIDEO =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export default function App() {
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        type: "video/mp4",
      },
    ],
    tracks: [
      {
        kind: "subtitles",
        src: "https://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_en.vtt",
        srclang: "en",
        label: "English",
        default: true,
      },
      {
        kind: "subtitles",
        src: "https://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_fr.vtt",
        srclang: "fr",
        label: "French",
      },
    ],
  };
  const handlePlayerReady = (player) => {
    console.log("Player ready:", player);
  };

  return (
    <div>
      <section className="player-container">
        <h2>Normal Video Demo (Video.js)</h2>
        <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      </section>

      <section className="player-container">
        <h2>360° VR Player (videojs-vr)</h2>
        <div>
          <h1>360 Video Demo</h1>
          <PanoramaVideo
            src="https://d8d913s460fub.cloudfront.net/krpanocloud/video/airpano/video-1920x960a-fs.mp4"
            height="500px"
            radius={8000}
            options={{
              autoplay: true,
              muted: true,
              loop: true,
              autoRotate: true,
              autoRotateSpeed: 0.3,
            }}
          />
        </div>
      </section>
    </div>
  );
}
