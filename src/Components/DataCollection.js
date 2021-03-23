import React, {useEffect, useState} from 'react';
import '../App.css';
import {MyCarousel} from "./Home";
import 'semantic-ui-css/semantic.min.css';

function DataCollection() {
    const [currentLatitude, setCurrentLatitude] = useState();
    const [currentLongitude, setCurrentLongitude] = useState();
    const [updateCoords, setUpdateCoords] = useState(false);
    const [recording, setRecording] = useState(false);
    const [isWet, setIsWet] = useState(null);
    const [ripplePool, setRipplePool] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentLatitude(position.coords.latitude);
            setCurrentLongitude(position.coords.longitude);
        })
    }, [updateCoords]);

    navigator.geolocation.watchPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
    });

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <button className={"App-button"} type={"button"} onClick={() => {
                        if(isWet == null || ripplePool == null) {
                            window.alert("Please input initial wet/dry and ripple/pool values");
                        } else {
                            setRecording(!recording);
                        }
                    }}>
                        {recording ? "Stop" : "Record"}
                    </button>
                    <button className={"App-button"} type={"button"} onClick={()=> {
                        window.alert("Are you sure you want to stop recording?");
                    }}>
                        Finish Recording
                    </button>
                </div>
                <MyCarousel/>

                <div className="ui buttons">
                    <button onClick={() => {
                        setRipplePool(0);
                    }} className={`ui button ${ripplePool == 0 ? "active" : ""}`}>Ripple</button>
                    <button onClick={() => {
                        setRipplePool(1);
                    }} className={`ui button ${ripplePool == 1 ? "active" : ""}`}>Neither</button>
                    <button onClick={() => {
                        setRipplePool(2);
                    }} className={`ui button ${ripplePool == 2 ? "active" : ""}`}>Pool</button>
                </div>
                <div>
                    <div className="ui buttons">
                        <button onClick={() => {
                            setIsWet(0);
                        }} className={`ui button ${isWet == 0 ? "active" : ""}`}>Wet</button>
                        <button onClick={() => {
                            setIsWet(1);
                        }} className={`ui button ${isWet == 1 ? "active" : ""}`}>Dry</button>
                    </div>
                </div>
                <p>Current Location: {currentLatitude}, {currentLongitude}</p>
                <p>
                    <button className={"App-button"} type={"button"} onClick={() => {window.location.href = "/#/POI"}}>
                        Add POI
                    </button>
                </p>

            </header>
        </div>
    );
};
export default DataCollection;