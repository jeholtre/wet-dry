import React, {useEffect, useState} from 'react';
import { Button, Image, Header, Icon, Card, Placeholder, Segment, Grid, Divider, Form } from 'semantic-ui-react';
import '../css/POI.css';
import GoogleMapReact from 'google-map-react';

function POI() {

    const [currentLatitude, setCurrentLatitude] = useState();
    const [currentLongitude, setCurrentLongitude] = useState();
    const [date, setDate] = useState(new Date());

     //Should update everytime position changes
     navigator.geolocation.watchPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setCurrentLatitude(position.coords.latitude);
        setCurrentLongitude(position.coords.longitude);
        // let p = {latitude: position.coords.latitude, longitude: position.coords.longitude};
    });

    return (
        <div className="POI">
            <Header as='h1' textAlign='center' paddingTop="10px">
                <Header.Content>Point of Interest<Icon name='rss' className="icon"/></Header.Content>
            </Header>
            <Segment placeholder className="placeHolder">
                <Header icon>
                    <Icon name='camera retro' />
                    We don't have any photos for your Point of Interest.
                </Header>
                <Segment.Inline>
                    <Button color='green'>Add Photo</Button>
                </Segment.Inline>
            </Segment>
            <div className="placeHolder">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyB9xcKvAjPfaHXB8lBW-VfchEe8twYxVrU" }}
                    defaultCenter={{lat: currentLatitude, lng: currentLongitude}}
                    defaultZoom={12}
                >
                </GoogleMapReact>
            </div>
            <Segment className="placeHolder" style={{ height: "auto" }}>
                <Form>
                    <Grid columns={2} relaxed='very'>
                        <Grid.Column>
                            <p><Header as='h5'>Location</Header>Latitude: {currentLatitude},<br></br> Longitude: {currentLongitude}</p>
                            <p><Header as='h5'>Date</Header>
                                { (date.getUTCMonth() + 1) + "/" + date.getUTCDate() + "/" + date.getUTCFullYear() }
                            </p>
                            <p><Header as='h5'>Stream Name</Header>Stream Name</p>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.TextArea label="Description" minHeight={100}></Form.TextArea>
                            <Form.Button>Submit</Form.Button>
                        </Grid.Column>
                        <Divider vertical className="relative"></Divider>
                    </Grid>
                </Form>
            </Segment>
{/*             <Card className="placeHolder">
                <Card.Content>
                    <Placeholder>
                    <Placeholder.Image rectangular />
                    </Placeholder>
                </Card.Content>
            </Card> */}
        </div>
    );
};
export default POI;