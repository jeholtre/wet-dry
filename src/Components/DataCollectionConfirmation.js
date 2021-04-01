import React, {useState} from 'react';
import { Container, Input } from 'semantic-ui-react';
import GoogleMapReact from "google-map-react";


function Confirmation()
{

    const [currentLatitude, setCurrentLatitude] = useState();
    const [currentLongitude, setCurrentLongitude] = useState();
    const [date, setDate] = useState(new Date());

    navigator.geolocation.watchPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setCurrentLatitude(position.coords.latitude);
        setCurrentLongitude(position.coords.longitude);
        // let p = {latitude: position.coords.latitude, longitude: position.coords.longitude};
    });

    return (
        <div className={'POI'}>
            <header className={"App-header"}>
                <Container className={'POI'}>
                    <h1 size="huge"><strong><u> Stream Data Confirmation </u></strong></h1>
                    <br></br>
                    <br></br>
                    <p>
                        <strong>Stream:    </strong>
                        <Input size="mini" placeholder='Stream Name'/>
                    </p>
                    <p>
                        <strong>Stream Section:    </strong>
                        <Input size="mini" placeholder='Stream Section' />
                    </p>
                    <p>
                        <strong>Class/Section ID:   </strong>
                        <Input size="mini" placeholder='ID' />
                    </p>
                    <div style={{ height: '40vh', width: '40wh' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "AIzaSyB9xcKvAjPfaHXB8lBW-VfchEe8twYxVrU" }}
                            defaultCenter={{lat: currentLatitude, lng: currentLongitude}}
                            defaultZoom={12}
                        >
                        </GoogleMapReact>
                    </div>
                </Container>




                <p>
                    <button className={"App-button"} type={"button"} onClick={() => {window.location.href = "wet-dry#/"}}>
                        Back
                    </button>
                    <button className={"App-button"} type={"button"} onClick={() => {window.location.href = "wet-dry/#/About"}}>
                        Submit
                    </button>
                    <button className={"App-button"} type={"button"} onClick={() => {window.location.href = "wet-dry/#/About"}}>
                        ?
                    </button>
                </p>
            </header>
        </div>
    );

};


export default Confirmation;