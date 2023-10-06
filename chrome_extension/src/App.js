import logo from './logo.svg';
import SpeechRecognizer from './recorder';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <SpeechRecognizer/>
      </header>
    </div>
  );
}

export default App;
