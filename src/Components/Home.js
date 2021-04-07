import React, {useEffect, useState} from 'react';
import {Button, Image, Reveal, Segment} from 'semantic-ui-react';
import Main from "../routes";
import '../App.css';
import logo from '../logo.svg';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import river1 from "../images/river1.jfif";
import river2 from "../images/river2.jfif";
import river3 from "../images/river3.jfif";

export const MyCarousel = () => (
    <Carousel plugins={['arrows']}>
        <img src={river1} />
        <img src={river2} />
        <img src={river3} />
    </Carousel>
);


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
                <MyCarousel/>

                <Segment Real>
                    <Button color={'green'} onClick={() => {window.location.href = "wet-dry/#/PrelimDataAcq"}}>Start</Button>
                    <Button color={'green'} onClick={() => {window.location.href = "wet-dry/#/About"}}>About</Button>
                </Segment>

                <Segment debugging>
                <p>
                    <button className={"App-button"} type={"button"} onClick={() => {window.location.href = "wet-dry/#/DataCollection"}}>
                        Data Collection
                    </button>
                    <button className={"App-button"} type={"button"} onClick={() => {window.location.href = "wet-dry/#/About"}}>
                        About
                    </button>
                </p>
                <p>
                    <button className={"App-button"} type={"button"} onClick={() => {window.location.href = "wet-dry/#/PrelimDataAcq"}}>
                        Preliminary Data Aqc. Page
                    </button>
                    <button className={"App-button"} type={"button"} onClick={() => {window.location.href = "wet-dry/#/DataCollectionConfirmation"}}>
                        DataCollectionConfirmation Page
                    </button>
                </p>
                <p>
                    <button className={"App-button"} type={"button"} onClick={() => {window.location.href = "wet-dry/#/POI"}}>
                        POI Page
                    </button>
                </p>
                </Segment>
            </header>
        </div>
    );
};
export default Home;