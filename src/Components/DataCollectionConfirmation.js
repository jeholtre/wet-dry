import React, {useState} from 'react';
import {Button, Container, Input, Modal} from 'semantic-ui-react';
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
    const [open, setOpen] = React.useState(false)
    return (
        <div className={'POI'}>
            <header>
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
                    {/*<button className={"App-button"} type={"button"} onClick={() => {window.location.href = "/#"}}>*/}
                    {/*    Back*/}
                    {/*</button>*/}
                    {/*<button className={"App-button"} type={"button"} onClick={() => {window.location.href = "#/About"}}>*/}
                    {/*    Submit*/}
                    {/*</button>*/}
                    {/*<button className={"App-button"} type={"button"} onClick={() => {window.location.href = "#/About"}}>*/}
                    {/*    ?*/}
                    {/*</button>*/}
                    <Button color={'green'} onClick={() => {window.location.href = "/"}}>Submit</Button>
                    <Modal
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        trigger={<Button color={'green'}>Help</Button>}
                    >
                        <Modal.Header>Help for the Data Confirmation Page</Modal.Header>
                        <Modal.Content image>
                            <Modal.Description>
                                <p>
                                    If you need to make changes to your Stream name, section, or class ID you can do
                                    that in the provided fields.  <br/>You can track your trail to make sure it is accurate,
                                    and if everything looks good you click on the Submit button to save the trail.
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