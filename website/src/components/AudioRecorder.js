import { useState,useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { useReactToPrint } from 'react-to-print';
import getaccessgif from "../assets/gifs/mute.gif"
import recordinggif from "../assets/gifs/recording.gif"
import downloadgif from "../assets/gifs/download.gif"
 
const AudioRecorder = () => {
    const mimeType = "audio/wav";
    const [qrCodeData, setQrCodeData] = useState(null); // State to hold QR code data
    const qrCodeRef = useRef();
  const [progressWidth, setProgressWidth] = useState("30%"); // State to control progress bar width
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);
    const [params, setParams] = useState({});
    const [progress,setProgress]=useState(0) 
    // 0- audio recording
    // 1- downloading
    // 2- goining to sign
    useEffect(() => {
      // Parse the URL parameters and store them in the 'params' state
      const searchParams = new URLSearchParams(window.location.search);
      const paramsObject = {};
      for (const [key, value] of searchParams) {
        paramsObject[key] = value;
      }
      setParams(paramsObject);
    }, []);
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
    setProgressWidth("60%");
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
            setProgress(1)
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
    console.log(qrCodeRef.current)

  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });

        };
    };
    const GoBack=()=>{
        setProgress(progress-1)
        setProgressWidth("30%")

    }
    const DownloadQR= () => {
        setProgress(2)
        setProgressWidth("100%")
        handlePrint();
    }
    const handlePrint = useReactToPrint({
        content: () => qrCodeRef.current,
      });
    return (
        <div >
            <h2>Audio Recorder</h2>
           
            <div style={{display:"flex"}}>
            <div className="Main-dialouge">
                <div>
                <div className="progress-bar" style={{ width: progressWidth }}></div>
                
                {!permission ? (
                    <div>
                        <h2>Grant Access</h2>
                        <img src={getaccessgif}></img>
                        </div>
                ):null}
                 {progress==1 ?(
                    <div>
                        <h2>Download AudioSign</h2>
                        <img src={downloadgif}></img>

                        </div>
                ):null}
                {progress==2 ?(
                    <div>
                        <h2>Complete Signature</h2>
                        <h1 style={{fontSize:"100px"}}>🥳</h1>
                        </div>
                ):null}
                {progress==0 && permission && recordingStatus === "inactive" ? (
                    <div>
                    <h2>Start Recording</h2>
                    <h1 style={{fontSize:"100px"}}>🙊</h1>
                        </div>
                ):null}
                {recordingStatus === "recording" ? (
                    <div>
                        <h2>Recording...</h2>
                        <img src={recordinggif}></img>
                        </div>
                ):null}
                </div>
            {progress==0 ? (
                    <div>

                <main>
                <div className="audio-controls"  style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                    {/* {audio ? (
                        <div className="audio-container">
                            <audio src={audio} controls ></audio>
                            <a download href={audio}>
                                Download Recording
                            </a>
                        </div>
                    ) : null} */}
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
                        <button class="button-45"  onClick={stopRecording} type="button">
                            ✋ Stop Recording
                        </button>
                    ) : null}
                </div>
            </main>
                        <div style={{display:"flex"}}>
                        <p>click on the start button and tell </p>
                        <p style={{marginLeft:"3px" , background:"#90EE90"  ,paddingRight:"3px",paddingLeft:"3px",borderRadius:"5px"}}> I agree</p></div>

                        
                    </div>
                    ) : null}
            {progress==1 ?
            (
                <div >
                    <button className="button-39" onClick={GoBack} type="button">
                        Back
                    </button>
                    <button  className="button-38" onClick={DownloadQR} type="button">
                        Download 
                    </button>
                    </div>
            ):null}
            {
                progress==2 ?(
                    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                          
                        <a className="button-18" href={params.id}>🚀 Sign</a>
                    
                    </div>
                ):null
            }
            </div>
            
            </div>
      
           
            
            <div style={{height:"200vh"}}>

            </div>
            {qrCodeData && (
                    
                    <div className="qr-code-container">
                      <div ref={qrCodeRef}>
                      <QRCode id="qr-code" value={qrCodeData} size={500} />
                      </div>
                      <div>
              </div>
                    </div>
                  )}
        </div>
    );
};
export default AudioRecorder