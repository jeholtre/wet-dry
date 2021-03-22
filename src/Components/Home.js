import React, {useEffect, useState} from 'react';
import Main from "../routes";
import '../App.css';
function Home() {
    const [currentLatitude, setCurrentLatitude] = useState();
    const [currentLongitude, setCurrentLongitude] = useState();
    const [updateCoords, setUpdateCoords] = useState(false);
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
                <p>
                    Welcome to Wet-Dry Mapping!
                </p>
                <button onClick={() => {
                    setUpdateCoords(!updateCoords);
                }}>Update coords!</button>
                <h1>Your coords are {currentLatitude}, {currentLongitude}</h1>
                <p>
                    <button className={"App-button"} type={"button"} onClick={() => {window.location.href = "/#/Login"}}>Login
                    </button>
                    <button className={"App-button"} type={"button"} onClick={() => {window.location.href = "/#/Login"}}>
                        Sign up
                    </button>
                </p>
                <p>
                    <button className={"App-button"} type={"button"} onClick={() => {window.location.href = "/#/About"}}>
                        About
                    </button>
                    <button className={"App-button"} type={"button"} onClick={() => {window.location.href = "/#/About"}}>
                        Help
                    </button>
                </p>
            </header>
        </div>
    );
};
export default Home;