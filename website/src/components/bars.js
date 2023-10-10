import React, { Component } from 'react';
import "../App.css"
class RandomBars extends Component {
  constructor() {
    super();
    this.state = {
      barHeights: Array(16).fill(0), // Initialize heights as an array of 10 zeros
      isFirstLoad: true, // Track whether it's the first load
    };
  }

  componentDidMount() {
    this.generateRandomHeights();
  }

  componentDidUpdate() {
    // After the initial load, remove the animation class to prevent
    // re-triggering the animation on subsequent renders.
    if (this.state.isFirstLoad) {
      setTimeout(() => {
        this.setState({ isFirstLoad: false });
      }, 1000); // Adjust the time based on your desired animation duration
    }
  }

  generateRandomHeights() {
    const randomHeights = this.state.barHeights.map(() => {
      return Math.floor(Math.random() * 60) + 50; // Random heights between 50 and 250
    });

    this.setState({ barHeights: randomHeights });
  }

  render() {
    const { barHeights, isFirstLoad } = this.state;

    return (
      <div className={`random-bars-container ${isFirstLoad ? 'animate' : ''}`}>
        {barHeights.map((height, index) => (
          <div
            key={index}
            className={`random-bar ${isFirstLoad ? 'grow' : ''}`}
            style={{ height: `${height}px` }}
          ></div>
        ))}
      </div>
    );
  }
}

export default RandomBars;
