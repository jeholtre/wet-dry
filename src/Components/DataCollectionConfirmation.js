import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Header, Icon, Modal, Segment, Loader} from 'semantic-ui-react';
import GoogleMapReact from "google-map-react";
import {CSVLink} from "react-csv";
import emailjs from 'emailjs-com';

export const clearLocalStorage = () => {
    localStorage.clear();
}

function Confirmation()
{
    const [currentLatitude, setCurrentLatitude] = useState();
    const [currentLongitude, setCurrentLongitude] = useState();
    const [loading, setLoading] = useState(true);
    const [updateTime] = useState(1000);

    const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));
    const [username, setUserName] = useState(localStorage.getItem('username'));
    const [stream, setStream] = useState(localStorage.getItem('stream'));
    const [streamSection, setStreamSection] = useState(localStorage.getItem('streamSection'));
    const [sectionID, setSectionID] = useState(localStorage.getItem('sectionID'));
    const [fileName, setFileName] = useState("trail-recording-default");
    const [trail] = useState(JSON.parse(localStorage.getItem("trail")) || []);


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

    const handleEmailChange = (e, {value} ) => {
        setUserEmail(value)
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
        localStorage.setItem('userEmail', userEmail)
    };

    navigator.geolocation.watchPosition(function(position) {
        setCurrentLatitude(position.coords.latitude);
        setCurrentLongitude(position.coords.longitude);
        // let p = {latitude: position.coords.latitude, longitude: position.coords.longitude};
    });
    const getPolyTrail = () =>{
        let polyTrail = [];
        for (let index = 0; index < trail.length; index++) {
            if (index % 2 != 0) {
                polyTrail.push(trail[index]);
            }
        }
        return polyTrail;
    }
    const handleApiLoaded = (map, maps) => {
        // use map and maps objects
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
            // let p = {latitude: position.coords.latitude, longitude: position.coords.longitude};
            // setTrail(trail => [...trail, p]);
        });
    };

    function convertToCSV(objArray) {
        let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        let str = '';

        for (let i = 0; i < array.length; i++) {
            let line = '';
            for (let index in array[i]) {
                if (line != '') line += ','

                line += array[i][index];
            }

            str += line + '\r\n';
        }

        return str;
    }


    function sendCSVEmail(list, user) {
        list.unshift({basin:"basin",subbasin:"subbasin",date:"date",observer:"observer",lat:"lat",lng:"lng", flowstate:"flowstate", POI:"POI",photo:"photo"});
        let jsonObj = JSON.stringify(list);
        console.log({jsonObj});
        let csv = convertToCSV(jsonObj);
        console.log({csv});
        let url = window.btoa(csv);
        console.log("email sent");
        //call api
        emailjs.send('jeholtre', 'template_kpccgdg', {
            csv: url,
            email: userEmail,
            stream: stream,
            section: streamSection,
            user: user,
            fileName: fileName
                }, "user_0ouDOPAgHvV1VrbQJKOME")
                    .then((result) => {
                        console.log("email response: " + result.text);
                    }, (error) => {
                        console.log(error.text);
                    });
    }


    const [open, setOpen] = React.useState(false)
    const [SubmitModal, setSubmitModal] = useState(false);

    return (
        <div className="PrelimDataAcq">
            <header>
                <Container>
                    <h1 size="huge"><strong> Stream Data Confirmation </strong></h1>
                    <br></br>
                    <Segment>
                        <Form onSubmit={handleSubmit}>
                            <Form.Field required>
                            <label>Name of Observer: </label>
                            <Form.Input
                                name='userName'
                                value={username}
                                onChange={handleUsernameChange}
                            />
                            <label>Email Address: </label>
                            <Form.Input
                                name='userEmail'
                                value={userEmail}
                                onChange={handleEmailChange}
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
                            </Form.Field>
                            <label>Class/Section ID: </label>
                            <Form.Input
                                name='sectionID'
                                value={sectionID}
                                onChange={handleSectionIDChange}
                            />

                            <Button type="submit" color={'blue'}
                                    disabled = {!username
                                    || !stream
                                    || !userEmail
                                    || !streamSection
                                    }
                                    onClick={() => {
                                        let d = new Date();
                                        let month = d.getUTCMonth();
                                        let year = d.getUTCFullYear();
                                        let formatDate = String(month).padStart(2, '0') + String(year).substring(2, 4);
                                        console.log(formatDate);
                                        setFileName(stream + "-" + username + "-" + formatDate);
                                        setSubmitModal(true);
                            }}>
                                Submit Data
                            </Button>

                            {/*Help button */}
                            <Modal
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}
                                open={open}
                                trigger={<Button color={'blue'}>Help</Button>}
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
                                    <Button color='blue' onClick={() => setOpen(false)}>
                                        Close Popup
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                        </Form>
                    <br/>

                    <div className="map" style={{ height: '30vh', width: '30wh' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "AIzaSyB6OJVSeLGq6wfAkC0Vy8e3EVGTKf_aE78" }}
                            defaultCenter={{lat: 0, lng: 0}}
                            center={{lat: currentLatitude, lng: currentLongitude}}
                            onGoogleApiLoaded={({map, maps})=>handleApiLoaded(map, maps)}
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
                    </Segment>
                </Container>
                <br/>
                <p>

                    <Modal
                        basic
                        onClose={() => setSubmitModal(false)}
                        open={SubmitModal}
                        size='small'>

                        <Header icon>
                            <Icon name='thumbs up outline' />
                            Success!
                        </Header>
                        <Modal.Content>
                            <p>
                                Would you like to send this recording as a csv to the desired email?
                                Sending POI pictures is not currently supported, sorry for the inconvenience!
                                We highly recommend you download the CSV to your device with the link below!!!!
                            </p>
                            <CSVLink filename={fileName + ".csv"} data={trail}>Download CSV to device!</CSVLink>
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
                                <Icon name='checkmark' /> Send Email!
                            </Button>
                        </Modal.Actions>
                    </Modal>

                </p>
            </header>

        </div>
    );

};


export default Confirmation;