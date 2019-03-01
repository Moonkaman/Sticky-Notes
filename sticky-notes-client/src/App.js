import React, { Component } from "react";

import "./App.css";

import StickyBoard from './components/StickyBoard/StickyBoard';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Sticky Notes</h1>
        <StickyBoard />
      </div>
    );
  }
}

export default App;
