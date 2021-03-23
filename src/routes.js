import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';

import Home from './Components/Home';
import Login from './Components/Login';
import About from './Components/About';
import DataCollection from './Components/DataCollection'
import DataCollectionConfirmation from './Components/DataCollectionConfirmation'
import POI from './Components/POI'
//import PrelimDataAcq from './Components/PrelimDataAcq'
const Main = () => {
    return (
    <HashRouter basename={"/wet-dry"}>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/Login' component={Login}/>
            <Route path='/About' component={About}/>
            {/*<Route path='/POI' component={POI}/>*/}
            <Route path='/DataCollection' component={DataCollection}/>
            {/*<Route path='/DataCollectionConfirmation' component={DataCollectionConfirmation}/>*/}
            {/*<Route path='/PrelimDataAcq' component={PrelimDataAcq}/>*/}
        </Switch>
    </HashRouter>
    );
};

export default Main;