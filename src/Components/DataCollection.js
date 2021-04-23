import React, {useEffect, useRef, useState} from 'react';
import '../App.css';
import '../css/DataCollection.css'
import 'semantic-ui-css/semantic.min.css';
import {Button, Header, Icon, Loader, Modal, Popup, Segment} from "semantic-ui-react";
import GoogleMapReact from 'google-map-react';


function DataCollection() {
    const [currentLatitude, setCurrentLatitude] = useState();
    const [currentLongitude, setCurrentLongitude] = useState();
    const [trail, setTrail] = useState(JSON.parse(localStorage.getItem("trail")) || []);
    const [recording, setRecording] = useState(false);
    const [started, setStarted] = useState(Boolean(JSON.parse(localStorage.getItem("started"))) || false);
    const [showHelp, setShowHelp] = useState(false);
    const [rifflePool, setRifflePool] = useState(Boolean(JSON.parse(localStorage.getItem("rifflePool"))) || null);
    const [finishModal, setFinishModal] = useState(false);
    const [pauseModal, setPauseModal] = useState(false);
    const [POIModal, setPOIModal] = useState(false);
    const [initialStateModal, setInitialStateModal] = useState(false);
    const [updateTime] = useState((localStorage.getItem('gPSInterval') * 1000) || 1000);

    function saveStateToLocal() {
        // localStorage.setItem("recording", recording);
        localStorage.setItem("started", JSON.stringify(started));
        localStorage.setItem("rifflePool", JSON.stringify(rifflePool));
        localStorage.setItem("trail", JSON.stringify(trail));
    }


    const [loading, setLoading] = useState(true);


     //initial update of coordinates
    useEffect(()=> {
            navigator.geolocation.getCurrentPosition( async function(position) {
                    await setCurrentLatitude(position.coords.latitude);
                    await setCurrentLongitude(position.coords.longitude);
                }, (err) => console.log(err),
                {enableHighAccuracy: false,
                    timeout: 5000,
                    maximumAge: Infinity});
    }, []);

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
    //updates that occur periodically while the user is recording
    useRecordTrailPoint(() => {
        const interval = setInterval(  () => {
            navigator.geolocation.getCurrentPosition( async function(position) {
                    setCurrentLatitude(position.coords.latitude);
                    setCurrentLongitude(position.coords.longitude);
                    let p = {lat: position.coords.latitude, lng: position.coords.longitude};
                    setTrail(trail => [...trail, p]);
                }, () => console.log("error"),
                {enableHighAccuracy: false,
                    timeout: 5000,
                    maximumAge: Infinity});
            // console.log({trail});
        }, updateTime);
        return () => clearInterval(interval);
    }, [], recording);

    const getPolyTrail = () =>{
        let polyTrail = [];
        for (let index = 0; index < trail.length; index++) {
            if (index % 2 !== 0) {
                polyTrail.push(trail[index]);
            }
        }
        return polyTrail;
    }

    const  handleApiLoaded = async (map, maps) => {
        let poly = new maps.Polyline({
            strokeColor: "#d01919",
            path: getPolyTrail(),
            strokeOpacity: 1.0,
            strokeWeight: 3,
            geodesic: true,
        });
        poly.setMap(map);
        setLoading(false);
        navigator.geolocation.getCurrentPosition( function(position) {
            setCurrentLatitude(position.coords.latitude);
            setCurrentLongitude(position.coords.longitude);
        });
    };


    saveStateToLocal(); //this should really not happen every render....

    return (
        <div className="DataCollection">
            <Header as='h1' textAlign='center' paddingTop="10px">
                <Header.Content>Press Start To Begin Recording!<Icon name='location arrow' className="icon"/></Header.Content>
            </Header>
            <Segment placeholder className="placeHolder" >
                <Header>
                    <div onClick={()=>setShowHelp(false)}>
                        <Popup
                            content={'Press to start and stop recording!'}
                            open={showHelp}
                            position="top center"
                            trigger={
                        <Button color={recording ? "red" : "green"} onClick={() => {
                            if( rifflePool == null) {
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
                <div className={recording ? "recording" : "not-recording"} onClick={()=>setShowHelp(false)}>
                    <div className="map">
                        <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyB6OJVSeLGq6wfAkC0Vy8e3EVGTKf_aE78" }}
                        center={{lat: currentLatitude, lng: currentLongitude}}
                        onGoogleApiLoaded={({map, maps}) => handleApiLoaded(map, maps)}
                        defaultZoom={14}/>

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
                <div onClick={()=>setShowHelp(false)}>
                    <Popup
                        content={'Toggle river state here!'}
                        open={showHelp}
                        position="top center"
                        trigger={
                    <div className="ui buttons three wide">
                        <Button onClick={() => {
                            setRifflePool(0);
                        }} className={`ui button ${rifflePool === 0 ? "primary" : ""}`}>Riffle</Button>
                        <Button onClick={() => {
                            setRifflePool(1);
                        }} className={`ui button ${rifflePool === 1 ? "primary" : ""}`}>Dry</Button>
                        <Button onClick={() => {
                            setRifflePool(2);
                        }} className={`ui button ${rifflePool === 2 ? "primary" : ""}`}>Pool</Button>
                    </div> } />
                </div>

                <p>Current Location: {currentLatitude}, {currentLongitude}</p>

                <Popup
                    content={"Add a point of interest or finalize the recording!"}
                    open={showHelp}
                    position="bottom center"
                    trigger={
                        <div onClick={()=>setShowHelp(false)} className={"ui buttons three wide"}>
                            <Button color={"blue"} type={"button"} onClick={() => {
                                setPOIModal(true);
                            }}>
                                Add POI
                            </Button>}/>
                            { started &&
                            <Button color={"red"} type={"button"} onClick={()=> {
                                setFinishModal(true);
                            }}>
                                Finish Recording
                            </Button>}/>}
                        </div>}></Popup>

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
                        setRifflePool(0);
                        setRecording(true);
                        setStarted(true);
                    }} className={`ui button ${rifflePool === 0 ? "active" : ""}`}>Riffle</Button>
                    <Button basic color='green' inverted onClick={() => {
                        setInitialStateModal(false)
                        setRifflePool(1);
                        setRecording(true);
                        setStarted(true);
                    }} className={`ui button ${rifflePool === 1 ? "active" : ""}`}>Dry</Button>
                    <Button basic color='green' inverted onClick={() => {
                        setInitialStateModal(false)
                        setRifflePool(2);
                        setRecording(true);
                        setStarted(true);
                    }} className={`ui button ${rifflePool === 2 ? "active" : ""}`}>Pool</Button>
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
                    <Button color='green' inverted onClick={() => {
                        setFinishModal(false);
                        window.location.href = "#/DataCollectionConfirmation";
                    }}>
                        <Icon name='checkmark' /> Yes
                    </Button>
                    <Button color='red' inverted onClick={() => setFinishModal(false)}>
                        <Icon name='remove' /> No
                    </Button>
                </Modal.Actions>
            </Modal>


            <Modal
                basic
                onClose={() => setPauseModal(false)}
                open={pauseModal}
                size='small'>
                <Header icon>
                    <Icon name='pause' />
                    Paused
                </Header>
                <Modal.Content>
                    <p>
                        If you're going to be gone for sometime, consider submitting your data now to prevent any loss of data!
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' inverted onClick={() => setPauseModal(false)}>
                        <Icon name='remove' /> Close
                    </Button>
                </Modal.Actions>
            </Modal>


            <Modal
                basic
                onClose={() => setPOIModal(false)}
                open={POIModal}
                size='small'>
                <Header icon>
                    This will pause the recording! Don't go too far!
                </Header>
                <Modal.Actions>
                    <Button color='green' inverted onClick={() => {
                        setPOIModal(false);
                        window.location.href = "#/POI";
                    }}>
                        <Icon name='checkmark' /> Add POI
                    </Button>
                    <Button color='red' inverted onClick={() => setPOIModal(false)}>
                        <Icon name='remove' /> Cancel
                    </Button>
                </Modal.Actions>
            </Modal>


        </div>
    );
};
export default DataCollection;