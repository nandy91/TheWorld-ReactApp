import React from 'react';
import './App.css';
import {AutoComplete} from './components/AutoComplete';
import worldimage from './assets/world.jpg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>The World</h1>
        <img className="world-image" src={worldimage} alt="world/"/>
      </header>
      <AutoComplete />
    </div>
  );
}

export default App;
