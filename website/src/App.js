import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Prompt from './pages/prompt';
import AudioRecorder from './components/AudioRecorder';
function App() {
  return (
    <div className="App">
<Router>
      <Routes>
      <Route path="/" element={ <Prompt/> } />
      <Route path="/recorder" element={ <AudioRecorder/> } />
      </Routes>
</Router>
    </div>
  );
}

export default App;