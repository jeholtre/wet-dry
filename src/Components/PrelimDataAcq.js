import React from 'react';
import {Form, Grid, Header, Segment} from 'semantic-ui-react'
import '../css/PrelimDataAcq.css'
// need to add corresponding button in Home.js then edit routes as well
// inputs down work
function PrelimDataAcq()
{
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
                <button className={"App-button"} type={"button"} onClick={() => {
                    window.location.href = "/"}}>back {/* Funny it send to address '/#/' */}
                </button>
                <button className={"App-button"} type={"button"} onClick={() => {
                    window.location.href = "#/DataCollection"}}>Submit
                </button>
                <button className={"App-button"} type={"button"} onClick={() => {
                    window.location.href = "#/About"}}>
                    ?
                </button>
            </Segment>
        </div>
    );
};
export default PrelimDataAcq;