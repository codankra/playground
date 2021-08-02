import React from "react";
import logo from "./logo.svg";
import CaeserInput from "./components/CeaserInput";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CaeserInput />
      </header>
    </div>
  );
}

export default App;
