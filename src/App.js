// import logo from './logo.svg';
import './App.css';
import Main from "./routes";
import React from "react";
import {HashRouter, Route, Switch} from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import About from "./Components/About";

function App() {
  return (
      <div className="App">
          <Main />
      </div>
  );
}

export default App;
