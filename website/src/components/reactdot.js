import React, { Component } from 'react';
import '../App.css'; // Import your CSS file for styling

class RecordingDots extends Component {
  constructor() {
    super();
    this.state = {
      dotCount: 1, // Number of dots to display initially
    };
  }

  componentDidMount() {
    this.animateDots(); // Start the animation when the component mounts
  }

  animateDots() {
    setInterval(() => {
      this.setState((prevState) => ({
        dotCount: (prevState.dotCount % 3) + 1, // Loop from 1 to 3
      }));
    }, 1000); // Adjust the interval based on your desired animation speed
  }

  render() {
    const { dotCount } = this.state;

    // Create an array of dots based on the current dotCount
    const dots = Array(dotCount).fill('.');

    return <div className="recording-dots">Recording {dots.join('')}</div>;
  }
}

export default RecordingDots;
