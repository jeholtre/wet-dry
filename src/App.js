// import logo from './logo.svg';
import './App.css';
import Main from "./routes";
import React from "react";

function App() {
  function goToLogin() {
    window.location.href="Login"
  }
  return (
      <div className="App">
        <Main />
      </div>
  );
}

export default App;
