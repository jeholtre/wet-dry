import React, {useEffect, useState} from 'react';
import { Button, Image, Reveal } from 'semantic-ui-react';
import Main from "../routes";
import '../App.css';
import logo from '../logo.svg';

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
                <Image src={logo} fluid />
                <button onClick={() => {
                    setUpdateCoords(!updateCoords);
                }}>Update coords!</button>
                <h1>Your coords are {currentLatitude}, {currentLongitude}</h1>
                <p>
                    <button className={"App-button"} type={"button"} onClick={() => {window.location.href = "wet-dry/#/Login"}}>Login
                    </button>
                    <button className={"App-button"} type={"button"} onClick={() => {window.location.href = "wet-dry/#/Login"}}>
                        Sign up
                    </button>
                </p>
                <p>
                    <button className={"App-button"} type={"button"} onClick={() => {window.location.href = "wet-dry/#/About"}}>
                        About
                    </button>
                    <button className={"App-button"} type={"button"} onClick={() => {window.location.href = "wet-dry/#/About"}}>
                        Help
                    </button>
                </p>
            </header>
        </div>
    );
};
export default Home;