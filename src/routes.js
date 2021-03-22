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
    <HashRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/Login' component={Login}/>
            <Route exact path='/About' component={About}/>
        </Switch>
    </HashRouter>
    );
};

export default Main;