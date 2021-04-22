import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Header, Icon, Input, Modal, Segment, Dimmer, Loader, Image,} from 'semantic-ui-react';
import GoogleMapReact from "google-map-react";
import {CSVLink} from "react-csv";
import API_KEY from './DataCollection'
import emailjs from 'emailjs-com';

export const clearLocalStorage = () => {
    localStorage.clear();
}

function Confirmation()
{
    const [currentLatitude, setCurrentLatitude] = useState();
    const [currentLongitude, setCurrentLongitude] = useState();
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [updateTime, setUpdateTime] = useState(1000);
    const [username, setUserName] = useState(localStorage.getItem('username'));

    const [stream, setStream] = useState(localStorage.getItem('stream'));
    const [streamSection, setStreamSection] = useState(localStorage.getItem('streamSection'));
    const [sectionID, setSectionID] = useState(localStorage.getItem('sectionID'));

    const [trail, setTrail] = useState(JSON.parse(localStorage.getItem("trail")) || []);


    const handleUsernameChange = (e, {value} ) => {
        setUserName(value)
    };
    const handleStreamChange = (e, {value} ) => {
        setStream(value)
    };
    const handleStreamSectionChange = (e, {value} ) => {
        setStreamSection(value)
    };
    const handleSectionIDChange = (e, {value} ) => {
        setSectionID(value)
    };

    useEffect(()=> {
        const interval = setInterval(  () => {
            navigator.geolocation.getCurrentPosition( async function(position) {
                    await setCurrentLatitude(position.coords.latitude);
                    setCurrentLongitude(position.coords.longitude);
                }, (err) => console.log(err),
                {enableHighAccuracy: false,
                    timeout: 5000,
                    maximumAge: Infinity});
        }, updateTime);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = () => {
        localStorage.setItem('username', username)
        localStorage.setItem('stream', stream)
        localStorage.setItem('streamSection', streamSection)
        localStorage.setItem('sectionID', sectionID)
    };

    navigator.geolocation.watchPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setCurrentLatitude(position.coords.latitude);
        setCurrentLongitude(position.coords.longitude);
        // let p = {latitude: position.coords.latitude, longitude: position.coords.longitude};
    });

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

    function convertToCSV(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','

                line += array[i][index];
            }

            str += line + '\r\n';
        }

        return str;
    }

    function sendCSVEmail(list, user) {
        let jsonObj = JSON.stringify(list);
        console.log({jsonObj});
        let csv = convertToCSV(jsonObj)
        console.log({csv});
        let url = window.btoa(csv)
        let fileName = stream + "-" + user + ".csv";
        console.log("csv: " + url + " user: " + user);
        //call api
        // emailjs.send('jeholtre', 'template_kpccgdg', {
        //     csv: url,
        //     user: user,
        //     fileName: fileName
        //         }, "user_0ouDOPAgHvV1VrbQJKOME")
        //             .then((result) => {
        //                 console.log("email response: " + result.text);
        //             }, (error) => {
        //                 console.log(error.text);
        //             });
    }



    const [open, setOpen] = React.useState(false)
    const [SubmitModal, setSubmitModal] = useState(false);
    return (
        <div className="PrelimDataAcq">
            <header>
                <Container>
                    <h1 size="huge"><strong> Stream Data Confirmation </strong></h1>
                    <br></br>
                    <br></br>
                    <Segment>
                        <Form onSubmit={handleSubmit}>
                            <Form.Field required>
                            <label>Name of Surveyor: </label>
                            <Form.Input
                                name='userName'
                                value={username}
                                onChange={handleUsernameChange}
                            />
                            <label>Stream: </label>
                            <Form.Input
                                name='stream'
                                value={stream}
                                onChange={handleStreamChange}
                            />
                            <label>Stream Section: </label>
                            <Form.Input
                                name='streamSection'
                                value={streamSection}
                                onChange={handleStreamSectionChange}
                            />
                            <label>Class/Section ID: </label>
                            <Form.Input
                                name='sectionID'
                                value={sectionID}
                                onChange={handleSectionIDChange}
                            />
                            </Form.Field>
                            <Button type="submit" color={'green'}  onClick={() => {
                                setSubmitModal(true);
                            }}>
                                Submit Data
                            </Button>

                            {/*Help button */}
                            <Modal
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}
                                open={open}
                                trigger={<Button color={'green'}>Help</Button>}
                            >
                                <Modal.Header>Help for the Confirmation Page</Modal.Header>
                                <Modal.Content image>
                                    <Modal.Description>
                                        <p>
                                            This page is to make sure that all of your inputs from the acquisition
                                            page are correct, and you can change any of them as necessary.
                                        </p>
                                    </Modal.Description>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='green' onClick={() => setOpen(false)}>
                                        Close Popup
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                        </Form>
                    <br/>

                    <div className="map" style={{ height: '30vh', width: '30wh' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: API_KEY }}
                            defaultCenter={{lat: 0, lng: 0}}
                            center={{lat: currentLatitude, lng: currentLongitude}}
                            onGoogleApiLoaded={handleApiLoaded}
                            defaultZoom={12}/>
                        { loading ?
                            <div className="loaderWrapper">
                                <Loader active></Loader>
                            </div>
                            :   <div className="loaderWrapper">
                                <Loader disabled></Loader>
                            </div>
                        }
                    </div>
                    </Segment>
                </Container>
                <br/>
                <p>

                    <Modal
                        basic
                        onClose={() => setSubmitModal(false)}
                        open={SubmitModal}
                        size='small'>
                        {/*<div>*/}
                        {/*    <Segment>*/}
                        {/*        <Dimmer active>*/}
                        {/*            <Loader indeterminate   >Exporting CSV File</Loader>*/}
                        {/*        </Dimmer>*/}

                        {/*        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />*/}
                        {/*    </Segment>*/}
                        {/*</div>*/}
                        <Header icon>
                            <Icon name='thumbs up outline' />
                            Success!
                        </Header>
                        <Modal.Content>
                            <p>
                                Your CSV File has been successfully uploaded to the associated Google Drive, Return to the home page?
                            </p>
                            <CSVLink data={trail}>Download CSV to device!</CSVLink>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button basic color='red' inverted onClick={() => setSubmitModal(false)}>
                                <Icon name='remove' /> No
                            </Button>
                            <Button color='green' inverted onClick={() => {
                                setSubmitModal(false);
                                sendCSVEmail(trail, username);
                                clearLocalStorage();
                                window.location.href = "#/";
                            }}>
                                <Icon name='checkmark' /> Yes
                            </Button>
                        </Modal.Actions>
                    </Modal>

                </p>
            </header>

        </div>
    );

};


export default Confirmation;