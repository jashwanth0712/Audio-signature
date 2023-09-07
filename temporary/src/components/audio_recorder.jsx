import { useState, useRef } from "react";


const AudioRecorder = () => {
    const mimeType = "audio/mp3";

    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);
    const [positiveIntArray, setPositiveIntArray] = useState([]);
    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async () => {
        setRecordingStatus("recording");
        console.log("recording started");
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream, { type: mimeType });
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    };
    function binaryDataToPositiveIntArray(binaryData) {
        const uintArray = new Uint8Array(binaryData);
        const positiveIntArray = Array.from(uintArray);
        return positiveIntArray;
    }
    const regenerateAudio = () => {
        if (positiveIntArray.length === 0) {
            console.error("No positive integer array to regenerate audio from.");
            return;
        }

        // Create an AudioContext
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Create an empty audio buffer
        const audioBuffer = audioContext.createBuffer(1, positiveIntArray.length, audioContext.sampleRate);

        // Copy the positive integer array into the audio buffer
        const audioData = audioBuffer.getChannelData(0);
        for (let i = 0; i < positiveIntArray.length; i++) {
            audioData[i] = positiveIntArray[i] / 255; // Normalize to the range [0, 1]
        }

        // Create an audio buffer source and play it
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start();
    };
    const stopRecording = () => {
        setRecordingStatus("inactive");
        // Stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            // Creates a blob file from the audioChunks data
            const audioBlob = new Blob(audioChunks, { type: mimeType });
    
            // Create a new FileReader
            const reader = new FileReader();
    
            // Define a callback function to handle the FileReader onload event
            reader.onload = function(event) {
                // The result property of the FileReader contains the binary representation
                const binaryData = event.target.result;
    
                // Convert binary data to an array of positive integers
                setPositiveIntArray( binaryDataToPositiveIntArray(binaryData))
    
                // Now, you have the audio data as a single-dimensional array of positive integers
                console.log("Positive Integer Array:", positiveIntArray);
    
                // Optionally, you can create audio from this array using the function you mentioned.
                // Example: createAudioFromPositiveIntArray(positiveIntArray);
            };
    
            // Read the audioBlob as an ArrayBuffer
            reader.readAsArrayBuffer(audioBlob);
    
            // Optionally, you can also create a playable URL from the blob file as before
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
            setAudioChunks([]);
            console.log("stop ran");
        };
    };
    
    return (
        <div>
            <h2>Audio Recorder</h2>
            <main>
                <div className="audio-controls">
                    {audio ? (
                        <div className="audio-container">
                            <audio src={audio} controls></audio>
                            <a download href={audio}>
                                Download Recording
                            </a>
                        </div>
                    ) : null}
                    {!permission ? (
                        <button onClick={getMicrophonePermission} type="button">
                            Get Microphone
                        </button>
                    ) : null}
                    {permission && recordingStatus === "inactive" ? (
                        <button onClick={startRecording} type="button">
                            Start Recording
                        </button>
                    ) : null}
                    {recordingStatus === "recording" ? (
                        <button onClick={stopRecording} type="button">
                            Stop Recording
                        </button>
                    ) : null}
                    {positiveIntArray.length > 0 ? (
                        <button onClick={regenerateAudio} type="button">
                            Regenerate Audio
                        </button>
                    ) : null}
                </div>
            </main>
        </div>
    );
};

export default AudioRecorder;