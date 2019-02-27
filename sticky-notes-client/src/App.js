import React, { Component } from "react";

import StickyNote from './components/Sticky-Notes/StickyNote';

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>App</h1>
        <StickyNote />
      </div>
    );
  }
}

export default App;
