// import logo from './logo.svg';
import './App.css';
import Main from "./routes";
import React from "react";
import {HashRouter, Route} from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import About from "./Components/About";

function App() {
  function goToLogin() {
    window.location.href="Login"
  }
  return (
      <div className="App">
          <HashRouter basename="/">
              <Route exact path='/' render={() => {
                  return <Home/>
              }}/>
              <Route exact path='/Login' render={() =>{
                  return <Login/>
              }}/>
              <Route exact path='/About' render={() =>{
                  return <About/>
              }}/>
          </HashRouter>
      </div>
  );
}

export default App;
