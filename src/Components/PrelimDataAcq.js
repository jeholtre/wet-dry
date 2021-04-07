import React from 'react';
import {Button, Form, Grid, Header, Modal, Segment} from 'semantic-ui-react'
import '../css/PrelimDataAcq.css'
// need to add corresponding button in Home.js then edit routes as well
// inputs down work
function PrelimDataAcq()
{
    const [open, setOpen] = React.useState(false)
    return (
        <div className="PrelimDataAcq">
            <Header as='h1' textAlign='center' paddingTop="10px">
                <Header.Content>Preliminary Data Acquisition</Header.Content>
            </Header>
            <Segment className = "inputAreas">
                <Form>
                    <Form.Input label = 'Name of Surveyor:' placeholder='you name here'/>
                    <Form.Input label = 'Stream:' placeholder='stream name'/>
                    <Form.Input label = 'Stream Section:' placeholder='direction branch'/>
                    <Form.Input label = 'Class/Section ID:' placeholder='#######'/>
                </Form>
                <Button color={'green'} onClick={() => {
                    window.location.href = "/"}}>back {/* Funny it send to address '/#/' */}
                </Button>
                <Button color={'green'}  onClick={() => {
                    window.location.href = "#/DataCollection"}}>Submit
                </Button>
                <button className={"App-button"} type={"button"} onClick={() => {
                    window.location.href = "#/About"}}>
                    ?
                </button>
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