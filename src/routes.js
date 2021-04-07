import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';

import Home from './Components/Home';
import Login from './Components/Login';
import About from './Components/About';
import DataCollection from './Components/DataCollection';
import DataCollectionConfirmation from './Components/DataCollectionConfirmation';
import PrelimDataAcq from './Components/PrelimDataAcq';
import POI from './Components/POI';

const Main = () => {
    return (
    <HashRouter basename={"/wet-dry/"}>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/Login' component={Login}/>
            <Route path='/About' component={About}/>
            <Route path='/DataCollection' component={DataCollection}/>
            <Route path='/DataCollectionConfirmation' component={DataCollectionConfirmation}/>
            <Route path='/PrelimDataAcq' component={PrelimDataAcq}/>
            <Route path='/POI' component={POI}/>
        </Switch>
    </HashRouter>
    );
};

export default Main;