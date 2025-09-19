import React, { useEffect, useRef } from "react";
import * as PANOLENS from "panolens";

const PanoramaVideo = ({ src, height }) => {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Prevent creating multiple viewers
    if (!viewerRef.current) {
      viewerRef.current = new PANOLENS.Viewer({
        container: containerRef.current,
        autoHideInfospot: false,
        cameraFov: 75,
      });
    }

    const panorama = new PANOLENS.VideoPanorama(
      src,
      {
        autoplay: true,
        muted: true,
        loop: true,
        playsinline: true,
      },
      5000
    );

    viewerRef.current.add(panorama);

    return () => {
      // Remove panorama only, keep single viewer
      viewerRef.current.remove(panorama);
      panorama.dispose?.();
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: height ? height : "600px",
        background: "black",
      }}
    />
  );
};

export default PanoramaVideo;
