import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function VRPlayer({ src }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const rafIdRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const video = document.createElement("video");
    video.src = src;
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = false; // allow audio
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.controls = false;
    videoRef.current = video;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1100
    );
    camera.position.set(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Sharper Video Texture
    const texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.generateMipmaps = false;
    texture.encoding = THREE.sRGBEncoding;

    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let isUserInteracting = false;
    let lon = 0,
      lat = 0,
      onPointerDownLon = 0,
      onPointerDownLat = 0,
      onPointerDownX = 0,
      onPointerDownY = 0;

    function onPointerDown(e) {
      isUserInteracting = true;
      onPointerDownX = e.clientX;
      onPointerDownY = e.clientY;
      onPointerDownLon = lon;
      onPointerDownLat = lat;
    }
    function onPointerMove(e) {
      if (!isUserInteracting) return;
      lon = (onPointerDownX - e.clientX) * 0.1 + onPointerDownLon;
      lat = (e.clientY - onPointerDownY) * 0.1 + onPointerDownLat;
    }
    function onPointerUp() {
      isUserInteracting = false;
    }

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    function animate() {
      rafIdRef.current = requestAnimationFrame(animate);

      lat = Math.max(-85, Math.min(85, lat));
      const phi = THREE.MathUtils.degToRad(90 - lat);
      const theta = THREE.MathUtils.degToRad(lon);

      const target = new THREE.Vector3();
      target.x = Math.sin(phi) * Math.cos(theta);
      target.y = Math.cos(phi);
      target.z = Math.sin(phi) * Math.sin(theta);
      camera.lookAt(target);

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, [src]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div>
      <div
        ref={containerRef}
        style={{ width: "100%", height: 500, background: "#000" }}
      />
      <button onClick={handlePlayPause} style={{ marginTop: 10 }}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}
