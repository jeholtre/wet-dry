import React, {useEffect, useState} from 'react';
import { Button, Image, Header, Icon, Loader, Segment, Grid, Divider, Form } from 'semantic-ui-react';
import '../css/POI.css';
import GoogleMapReact from 'google-map-react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { useHistory } from 'react-router';

function POI() {

    const [currentLatitude, setCurrentLatitude] = useState();
    const [currentLongitude, setCurrentLongitude] = useState();
    const [date, setDate] = useState(new Date());
    const [camera, setCamera] = useState(false);
    const [dataUri, setDataUri] = useState('');
    const [loading, setLoading] = useState(true);
    const [updateTime, setUpdateTime] = useState(1000);

    let history = useHistory();

    //Should update everytime position changes
    useEffect(()=> {
        const interval = setInterval(  () => {
            navigator.geolocation.getCurrentPosition( async function(position) {
                await setCurrentLatitude(position.coords.latitude);
                setCurrentLongitude(position.coords.longitude);
                // let p = {latitude: position.coords.latitude, longitude: position.coords.longitude};
                // setTrail(trail => [...trail, p]);s
            }, (err) => console.log(err), 
            {enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: Infinity});
            // console.log({trail});
        }, updateTime);
        return () => clearInterval(interval);
    }, []);

    function handleSubmit() {
        history.push("/DataCollection");
    }

    function handleTakePhoto (dataUri) {
        // Do stuff with the photo...
        console.log('takePhoto');
        setDataUri(dataUri);
    }

    const handleApiLoaded = (map, maps) => {
        // use map and maps objects
        setLoading(false);
        navigator.geolocation.getCurrentPosition( function(position) {
            setCurrentLatitude(position.coords.latitude);
            setCurrentLongitude(position.coords.longitude);
            // let p = {latitude: position.coords.latitude, longitude: position.coords.longitude};
            // setTrail(trail => [...trail, p]);
        });
    };

    return (
        <div className="POI">
            <Header as='h1' textAlign='center' paddingTop="10px">
                <Header.Content>Point of Interest<Icon name='rss' className="icon"/></Header.Content>
            </Header>
            { camera ? 
                 dataUri ?
                <Segment placeholder className="placeHolder">
                    <Image src={dataUri} fluid bordered className="preview"/>
                    <Segment.Inline>
                        {/* <Button className = "previewButton" color='green'>Use This Photo</Button> */}
                        <Button className = "previewButton" color='red' onClick={ () => { setDataUri(''); } }>Retake Photo</Button>
                    </Segment.Inline>
                </Segment>
                :
                <Segment placeholder className="placeHolder">
                    <Camera className="preview" 
                        onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
                    />
                </Segment>
                :
                <Segment placeholder className="placeHolder">
                    <Header icon>
                        <Icon name='camera retro' />
                        We don't have any photos for your Point of Interest.
                    </Header>
                    <Segment.Inline>
                        <Button color='green' onClick={ () => { setCamera(true); } }>Add Photo</Button>
                    </Segment.Inline>
                </Segment>
            }
            <div className="placeHolder">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyB9xcKvAjPfaHXB8lBW-VfchEe8twYxVrU" }}
                    defaultCenter={{lat: 0, lng: 0}}
                    center={{lat: currentLatitude, lng: currentLongitude}}
                    defaultZoom={12}
                    onGoogleApiLoaded={handleApiLoaded}
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
            <Segment className="placeHolder" style={{ height: "auto" }}>
                <Form>
                    <Grid columns={2} relaxed='very'>
                        <Grid.Column>
                            <p><Header as='h5'>Location</Header>Latitude: {currentLatitude},<br></br> Longitude: {currentLongitude}</p>
                            <p><Header as='h5'>Date</Header>
                                { (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() }
                            </p>
                            <p><Header as='h5'>Stream Name</Header>Stream Name</p>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.TextArea label="Description" minHeight={100}></Form.TextArea>
                            <Form.Button onClick={ handleSubmit }>Submit</Form.Button>
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