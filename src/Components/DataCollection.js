import React, {useEffect, useState} from 'react';
import '../App.css';
import '../css/DataCollection.css'
import {MyCarousel} from "./Home";
import 'semantic-ui-css/semantic.min.css';
import  {Button,Header, Icon, Segment} from "semantic-ui-react";
import { usePosition } from 'use-position';
import {LiveLocation} from "./LiveLocation";
import GoogleMapReact from 'google-map-react';

function DataCollection() {
    const [currentLatitude, setCurrentLatitude] = useState();
    const [currentLongitude, setCurrentLongitude] = useState();
    const [trail, setTrail] = useState([]);
    const [updateCoords, setUpdateCoords] = useState(false);
    const [recording, setRecording] = useState(false);
    const [isWet, setIsWet] = useState(null);
    const [ripplePool, setRipplePool] = useState(null);


    navigator.geolocation.watchPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setCurrentLatitude(position.coords.latitude);
        setCurrentLongitude(position.coords.longitude);
        let p = {latitude: position.coords.latitude, longitude: position.coords.longitude};
        setTrail([...trail, p]);
    });

    return (

        <div className="DataCollection">
            <Header as='h1' textAlign='center' paddingTop="10px">
                <Header.Content>Press Start To Begin Recording!<Icon name='location arrow' className="icon"/></Header.Content>
            </Header>
            <Segment placeholder className="placeHolder">
                <Header>
                    <div>
                        <Button onClick={() => {
                            if(isWet == null || ripplePool == null) {
                                window.alert("Please input initial wet/dry and ripple/pool values");
                            } else {
                                setRecording(!recording);
                            }
                        }}>
                            {recording ? <Icon name="pause"/> :  <Icon name="play"/>}
                        </Button>
                        <Button  type={"button"} onClick={()=> {
                            window.alert("Are you sure you want to stop recording?");
                        }}>
                            <Icon name="stop"/>
                        </Button>
                    </div>
                </Header>
                <div style={{ height: '50vh', width: '50wh' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyB9xcKvAjPfaHXB8lBW-VfchEe8twYxVrU" }}
                    defaultCenter={{lat: currentLatitude, lng: currentLongitude}}
                    defaultZoom={12}
                >
                </GoogleMapReact>
                </div>
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
            </Segment>
            <Segment placeholder className="placeHolder">
                <LiveLocation />
                <p>
                    <button className={"App-button"} type={"button"} onClick={() => {window.location.href = "/#/POI"}}>
                        Add POI
                    </button>
                </p>
            </Segment>
        </div>
    );
};
export default DataCollection;