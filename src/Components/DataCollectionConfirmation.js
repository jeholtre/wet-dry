import React, {useState} from 'react';
import {Button, Container, Header, Icon, Input, Modal} from 'semantic-ui-react';
import GoogleMapReact from "google-map-react";
import {CSVLink} from "react-csv";


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
    const [open, setOpen] = React.useState(false)
    const [SubmitModal, setSubmitModal] = useState(false);
    return (
        <div className={'POI'}>
            <header className={"POI"}>
                <Container>
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
                <br/>
                <p>
                    <Button color={"green"} type={"button"} onClick={()=> {
                        setSubmitModal(true);
                    }}>
                        Submit Data
                    </Button>
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
                                Your CSV File has been successfully uploaded to the associated Google Drive, Return to the home page?
                            </p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button basic color='red' inverted onClick={() => setSubmitModal(false)}>
                                <Icon name='remove' /> No
                            </Button>
                            {/*<CSVLink data={trail}>Download me</CSVLink>;*/}
                            <Button color='green' inverted onClick={() => {
                                setSubmitModal(false);
                                window.location.href = "#/";
                            }}>
                                <Icon name='checkmark' /> Yes
                            </Button>
                        </Modal.Actions>
                    </Modal>
                    <Modal
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        trigger={<Button color={'green'}>Help</Button>}
                    >
                        <Modal.Header>Help for the Data Collection Confirmation Page</Modal.Header>
                        <Modal.Content image>
                            <Modal.Description>
                                <p>
                                    DATA COLLECTION CONFIRMATION PAGE HELP WIP
                                </p>
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='green' onClick={() => setOpen(false)}>
                                Close Popup
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </p>
            </header>
        </div>
    );

};


export default Confirmation;