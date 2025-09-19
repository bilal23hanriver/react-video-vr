import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import "video.js/dist/video-js.css";
// import "videojs-vr";
// import "videojs-vr/dist/videojs-vr.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
