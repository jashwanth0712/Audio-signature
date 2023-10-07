import "../App.css"
export default function  ListeningAnimation(){
    const imageUrl = 'https://raw.githubusercontent.com/jashwanth0712/Audio-signature/main/chrome_extension/assets/listening.gif';
    return (
        <img src={imageUrl} alt="Listening"  className="listening-animation"/>
    )
}