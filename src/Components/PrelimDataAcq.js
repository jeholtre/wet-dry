import React, {useState} from 'react';
import {Button, Form, Grid, Header, Modal, Segment} from 'semantic-ui-react'
import '../css/PrelimDataAcq.css'
// need to add corresponding button in Home.js then edit routes as well
// inputs down work

function PrelimDataAcq()
{

    const [username, setUserName] = useState('');
    const [stream, setStream] = useState('');
    const [streamSection, setStreamSection] = useState('');
    const [sectionID, setSectionID] = useState('');
    const [open, setOpen] = React.useState(false)

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

    const handleSubmit = () => {
        localStorage.setItem('username', username)
        localStorage.setItem('stream', stream)
        localStorage.setItem('streamSection', streamSection)
        localStorage.setItem('sectionID', sectionID)
        };

    return (
        <div className="PrelimDataAcq">
            <Header as='h1' textAlign='center' paddingTop="10px">
                <Header.Content>Preliminary Data Acquisition</Header.Content>
            </Header>
            <Segment className = "inputAreas">
                <Form onSubmit={handleSubmit}>
                    <label>Name of Surveyor: </label>
                    <Form.Input
                        placeholder='Your name here'
                        name='userName'
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <label>Stream: </label>
                    <Form.Input
                        placeholder='Stream name'
                        name='stream'
                        value={stream}
                        onChange={handleStreamChange}
                    />
                    <label>Stream Section: </label>
                    <Form.Input
                        placeholder='Section and Direction'
                        name='streamSection'
                        value={streamSection}
                        onChange={handleStreamSectionChange}
                    />
                    <label>Class/Section ID: </label>
                    <Form.Input
                        placeholder='#########'
                        name='sectionID'
                        value={sectionID}
                        onChange={handleSectionIDChange}
                    />
                    <Button type="submit" color={'green'}  onClick={() => {
                        window.location.href = "#/DataCollection"}}>Submit
                    </Button>
                </Form>

                <Button color={'green'} onClick={() => {
                    window.location.href = "/"}}>Back {/* Funny it send to address '/#/' */}
                </Button>

                <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={<Button color={'green'}>Help</Button>}
                >
                    <Modal.Header>Help for the Preliminary Data Acquisition Page</Modal.Header>
                    <Modal.Content image>
                        <Modal.Description>
                            <p>
                                PRELIM DATA PAGE DESCRIPTION AND HELP NEEDED HERE
                            </p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={() => setOpen(false)}>
                            Close Popup
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Segment>
        </div>
    );
};
export default PrelimDataAcq;