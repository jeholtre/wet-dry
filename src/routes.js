import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';

import App from './App';
import Home from './Components/Home';
//ADD these pages later
import Login from './Components/Login';
// import SignUp from '';
import About from './Components/About';

const Main = () => {
    return (
    <HashRouter basename={process.env.PUBLIC_URL}>
        <Switch>
            <Route exact path='/' render={() => {
                return <Home/>
            }}/>
            <Route exact path='/Login' render={() =>{
                return <Login/>
            }}/>
            <Route exact path='/About' render={() =>{
                return <About/>
            }}/>
        </Switch>
    </HashRouter>
    );
};

export default Main;