import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import waveVideo from './assets/wave.mp4'; // Import the mp4 file
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const setPlayBack = () => {
    videoRef.current.playbackRate = 0.001;
  };
  return (
    <>
      <div className="video-container">
        <video autoPlay loop muted className="background-video"  onCanPlay={() => setPlayBack()}>
          <source src={waveVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h1 className="video-overlay-text">Sign Wave</h1>
      </div>
    </>
  );
}

export default App;