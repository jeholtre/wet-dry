import React, {useEffect, useRef, useState} from 'react';
import '../App.css';
import '../css/DataCollection.css'
import 'semantic-ui-css/semantic.min.css';
import {Button, Header, Icon, Loader, Modal, Popup, Segment} from "semantic-ui-react";
import {LiveLocation} from "./LiveLocation";
import GoogleMapReact from 'google-map-react';
import { CSVLink, CSVDownload } from "react-csv";


function DataCollection() {
    const [currentLatitude, setCurrentLatitude] = useState();
    const [currentLongitude, setCurrentLongitude] = useState();
    const [trail, setTrail] = useState([]);
    //const [updateCoords, setUpdateCoords] = useState(false);
    const [recording, setRecording] = useState(false);
    const [started, setStarted] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [ripplePool, setRipplePool] = useState(null);
    const [finishModal, setFinishModal] = useState(false);
    const [pauseModal, setPauseModal] = useState(false);
    const [initialStateModal, setInitialStateModal] = useState(false);
    const [updateTime, setUpdateTime] = useState(1000);

    const [loading, setLoading] = useState(true);

    //Should update everytime position changes

    function useRecordTrailPoint(fn, deps=[], isReady=true) {
        const toggled = useRef(isReady);

        const getDep = () => {
            if (toggled.current) {
                return 1;
            }
            if (isReady) {
                toggled.current = true;
            }
            return 0;
        };
        useEffect(() => {
            if (!isReady) {
                return;
            }
            return fn();
        }, [...deps, fn, getDep()]);
    }


    useRecordTrailPoint(() => {
        const interval = setInterval(  () => {
            navigator.geolocation.getCurrentPosition( async function(position) {
                    setCurrentLatitude(position.coords.latitude);
                    setCurrentLongitude(position.coords.longitude);
                    let p = {latitude: position.coords.latitude, longitude: position.coords.longitude};
                    setTrail(trail => [...trail, p]);
                }, () => console.log("error"),
                {enableHighAccuracy: false,
                    timeout: 5000,
                    maximumAge: Infinity});
            // console.log({trail});
        }, updateTime);
        return () => clearInterval(interval);
    }, [], true);


    const handleApiLoaded = (map, maps) => {
        // use map and maps objects
        setLoading(false);
        console.log("?")
        navigator.geolocation.getCurrentPosition( function(position) {
            setCurrentLatitude(position.coords.latitude);
            setCurrentLongitude(position.coords.longitude);
            // let p = {latitude: position.coords.latitude, longitude: position.coords.longitude};
            // setTrail(trail => [...trail, p]);
        });
    };

    localStorage.setItem("trail", JSON.stringify(trail));
    console.log({trail});
    return (
        <div className="DataCollection">
            <Header as='h1' textAlign='center' paddingTop="10px">
                <Header.Content>Time to record!<Icon name='location arrow' className="icon"/></Header.Content>
            </Header>
            <Segment placeholder className="placeHolder">
                <Header>
                    <div>
                        <Popup
                            content={'The button starts and pauses the recording!'}
                            open={showHelp}
                            position="right center"
                            trigger={
                        <Button color={recording ? "red" : "green"} onClick={() => {
                            if( ripplePool == null) {
                                setInitialStateModal(true);
                            } else {
                                if(recording) {
                                    setPauseModal(true);
                                }
                                setRecording(!recording);
                                setStarted(true);
                            }
                        }}>
                            {recording ? "Pause Recording" :  (started ? "Resume Recording" : "Start Recording")}
                        </Button>
                        }
                        />

                    </div>
                    <Icon onClick={() => {
                        setShowHelp(!showHelp)
                    }} name={"question circle outline"}/>
                </Header>
                <div className={recording ? "recording" : "not-recording"}>
                    <div className="map">
                            <GoogleMapReact
                            bootstrapURLKeys={{ key: "AIzaSyB9xcKvAjPfaHXB8lBW-VfchEe8twYxVrU" }}
                            center={{lat: currentLatitude, lng: currentLongitude}}
                            onGoogleApiLoaded={handleApiLoaded}
                            defaultZoom={14}
                        >
                        </GoogleMapReact>
                        { loading ?
                            <div className="loaderWrapper">
                                <Loader active></Loader>
                            </div>
                            :   <div className="loaderWrapper">
                                <Loader disabled></Loader>
                            </div>
                        }
                    </div>
                </div>
                <div>
                    <Popup
                        content={'Toggle the current state of the river here!'}
                        open={showHelp}
                        position="top center"
                        trigger={
                    <div className="ui buttons three wide">
                        <button onClick={() => {
                            setRipplePool(0);
                        }} className={`ui button ${ripplePool == 0 ? "active" : ""}`}>Ripple</button>
                        <button onClick={() => {
                            setRipplePool(1);
                        }} className={`ui button ${ripplePool == 1 ? "active" : ""}`}>Dry</button>
                        <button onClick={() => {
                            setRipplePool(2);
                        }} className={`ui button ${ripplePool == 2 ? "active" : ""}`}>Pool</button>
                    </div> } />
                </div>

                <LiveLocation />
                <div className={"ui buttons three wide"}>

                    <Popup
                        content={'Press this button to add a point of interest at your current location!'}
                        open={showHelp}
                        position="bottom center"
                        trigger={
                    <Button color={"green"} type={"button"} onClick={() => {
                        window.location.href = "#/POI"
                    }}>
                        Add POI
                    </Button>}/>
                    { started &&
                    <Popup
                        content={"When you're finished, press this button!"}
                        open={showHelp}
                        position="bottom center"
                        trigger={
                    <Button color={"red"} type={"button"} onClick={()=> {
                        setFinishModal(true);
                    }}>
                        Finish Recording
                    </Button>}/>}

                </div>

            </Segment>
            <Modal
                basic
                onClose={() => setInitialStateModal(false)}
                open={initialStateModal}
                size='small'
            >
                <Header icon>
                    <Icon name='exclamation triangle' />
                    Please set the initial state of the river!
                </Header>
                <Modal.Actions>
                    <Button basic color='green' inverted onClick={() => {
                        setInitialStateModal(false)
                        setRipplePool(0);
                        setRecording(true);
                        setStarted(true);
                    }} className={`ui button ${ripplePool == 0 ? "active" : ""}`}>Ripple</Button>
                    <Button basic color='green' inverted onClick={() => {
                        setInitialStateModal(false)
                        setRipplePool(1);
                        setRecording(true);
                        setStarted(true);
                    }} className={`ui button ${ripplePool == 1 ? "active" : ""}`}>Dry</Button>
                    <Button basic color='green' inverted onClick={() => {
                        setInitialStateModal(false)
                        setRipplePool(2);
                        setRecording(true);
                        setStarted(true);
                    }} className={`ui button ${ripplePool == 2 ? "active" : ""}`}>Pool</Button>
                    <Button basic color='red' inverted onClick={() => setInitialStateModal(false)}>
                        <Icon name='remove' /> Back
                    </Button>
                </Modal.Actions>
            </Modal>
            <Modal
                basic
                onClose={() => setFinishModal(false)}
                open={finishModal}
                size='small'>
                <Header icon>
                    <Icon name='exclamation triangle' />
                    Finish Recording?
                </Header>
                <Modal.Content>
                    <p>
                        Once you confirm on the next page, you will be unable to return to this trail.
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setFinishModal(false)}>
                        <Icon name='remove' /> No
                    </Button>
                    {/*<CSVLink data={trail}>Download me</CSVLink>;*/}
                    <Button color='green' inverted onClick={() => {
                        setFinishModal(false);
                        console.log("submit");
                        window.location.href = "#/DataCollectionConfirmation";
                    }}>
                        <Icon name='checkmark' /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>


            <Modal
                basic
                onClose={() => setPauseModal(false)}
                open={pauseModal}
                size='small'>
                <Header icon>
                    <Icon name='exclamation triangle' />
                    Paused
                </Header>
                <Modal.Content>
                    <p>
                        If you're going to be gone for sometime, consider submitting your data now to prevent any loss of data!
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setPauseModal(false)}>
                        <Icon name='remove' /> Close
                    </Button>
                </Modal.Actions>
            </Modal>


        </div>
    );
};
export default DataCollection;