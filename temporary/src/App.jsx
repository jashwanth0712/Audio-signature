import "./App.css";
import { useState, useRef } from "react";
// import VideoRecorder from "../src/VideoRecorder";
import AudioRecorder from "../src/components/audio_recorder";
const mimeType = "audio/webm";

const App = () => {
    let [recordOption, setRecordOption] = useState("audio");
    const toggleRecordOption = (type) => {
        return () => {
            setRecordOption(type);
        };
    };
    return (
        <div>
            <h1>React Media Recorder</h1>
            <div className="button-flex">
                <button onClick={toggleRecordOption("audio")}>
                  Record Audio
                </button>
            </div>
            <div>
                <AudioRecorder />
            </div>
        </div>
    );
};
export default App;