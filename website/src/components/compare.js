import React, { useState ,useRef  } from 'react';
import RandomBars from './bars';
import RecordingDots from './reactdot';
const Comparer = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [isequal,setisequal]=useState(null)
    const mimeType = "audio/wav";
    const [audioChunks, setAudioChunks] = useState([]);
    const [permission, setPermission] = useState(false);
    const [audio, setAudio] = useState(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const mediaRecorder = useRef(null);
    const [stream, setStream] = useState(null);
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
        // Create a new Media recorder instance using the stream
        const media = new MediaRecorder(stream, { type: mimeType });
        // Set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        // Invokes the start method to start the recording process
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
          // Once the recording is stopped, set the progress bar width to 100%
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
            setRecordingStatus("inactive")
           
        };
    };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPdfFile(selectedFile);
    }
  };

  return (
  <div style={{display:'flex',flexDirection:"column",justifyContent:'center',alignItems:"center"}}>
      <div style={{ display: 'flex', justifyContent: 'space-around' ,alignItems:"center"}}>
      <div className="compare-card">
        <h2>Upload PDF</h2>
        {!pdfFile ?<h1 style={{fontSize:"100px"}}>📃</h1> :
      <RandomBars/>

        }
        <input
        className='button-34'
        style={{width:"100%"}}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />
       
      </div>
    {isequal==true && <h1>=</h1>}
    {isequal==false && <h1>≠</h1>}
      <div className="compare-card">
      <h2>Record Audio</h2>
      {audio ? (
                        <div className="audio-container">
                            <audio src={audio} controls ></audio>
                            <a class="button-39" download href={audio}>
                                Download Recording
                            </a>
                        </div>
                    ) : null}
      {!permission ? (
                        <button onClick={getMicrophonePermission} class="button-34" type="button">
                            🎙️ Get Microphone
                        </button>
                    ) : null}
                    
{permission && recordingStatus === "inactive" ? (
                        <button  class="button-4"  onClick={startRecording} type="button">
                            🙉 Start Recording
                        </button>
                    ) : null}
                    {recordingStatus === "recording" ? (
                        <div><RecordingDots/>
                        <button class="button-45"  onClick={stopRecording} type="button">
                            ✋ Stop Recording
                        </button></div>
                    ) : null}
                    
        </div>
    </div>
    {
        audio && pdfFile && <button class="button-34" style={{width:"350px"}} onClick={stopRecording} type="button">
        Compare
   </button>
    }
   
  </div>
  );
};

export default Comparer;
