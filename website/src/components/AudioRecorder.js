import { useState, useRef } from "react";
import QRCode from "qrcode.react";
import { useReactToPrint } from 'react-to-print';
const AudioRecorder = () => {
    const mimeType = "audio/wav";
    const [qrCodeData, setQrCodeData] = useState(null); // State to hold QR code data
    const qrCodeRef = useRef();
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);

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
    const stopRecording = () => {
        setRecordingStatus("inactive");
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            console.log(typeof(audioChunks))
            console.log(typeof(audioBlob))
            console.log(typeof(AudioBuffer))
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
            setAudioChunks([]);
            console.log("stop ran")
            // Assuming you have audioBlob and mimeType defined

// Assuming you have audioBlob and mimeType defined

const formData = new FormData();
formData.append('file', audioBlob, 'audio.wav'); // 'file' should match the field name expected by the server

fetch('https://dropbox-4zxc4m7upa-el.a.run.app/audio', {
  method: 'POST',
  body: formData,
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // You can parse the response if needed
  })
  .then((data) => {
    // Handle the response from the server
    console.log(data);
    setQrCodeData(data);
    handlePrint()
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });

        };
    };
    const handlePrint = useReactToPrint({
        content: () => qrCodeRef.current,
      });
    return (
        <div>
            <h2>Audio Recorder</h2>
            <main>
                <div className="audio-controls">
                {qrCodeData && (
                    
            <div className="qr-code-container">
              <p>QR Code for the recording:</p>
              <div ref={qrCodeRef}>
              <QRCode id="qr-code" value={qrCodeData} size={500} />
              </div>
              <div>
      </div>
            </div>
          )}
                    {audio ? (
                        <div className="audio-container">
                            <audio src={audio} controls ></audio>
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
                </div>
            </main>
        </div>
    );
};
export default AudioRecorder