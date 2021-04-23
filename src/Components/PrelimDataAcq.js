import React, {useState} from 'react';
import {Button, Form, Popup, Header, Modal, Segment, Dropdown} from 'semantic-ui-react'
import '../css/PrelimDataAcq.css'
// need to add corresponding button in Home.js then edit routes as well
// inputs down work

function isEmail(val)
{
    let regEmail =  /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    return regEmail.test(val);

}

function PrelimDataAcq()
{
    const [username, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    // const [falseEmail, setFalseEmail] = useState(null)
    const [stream, setStream] = useState('');
    const [streamSection, setStreamSection] = useState('');
    // need to know if this is correct. default false -> upstream?
    const [streamDirection, setStreamDirection] = useState(Boolean(JSON.parse(localStorage.getItem('streamDirection'))) || null);   // stream direction: 0-> upstream
    const [sectionID, setSectionID] = useState('');
    const [gPSInterval, setGPSInterval] = useState(1)
    const [open, setOpen] = React.useState(false)

    const handleUsernameChange =    (e, {value} ) => {
        setUserName(value)
    };
    const handleEmailChange =       (e, {value}) => {
        setUserEmail(value)
    };
    const handleStreamChange =      (e, {value} ) => {
        setStream(value)
    };
    const handleStreamSectionChange = (e, {value} ) => {
        setStreamSection(value)
    };
    const handleSectionIDChange =   (e, {value} ) => {
        setSectionID(value)
    };
    const handleGPSIntervalChange = (e, {value}) => {
        setGPSInterval(value)
    }

    const handleSubmit = () => {
        localStorage.setItem('username', username)
        localStorage.setItem('userEmail', userEmail)
        localStorage.setItem('stream', stream)
        localStorage.setItem('streamSection', streamSection)
        localStorage.setItem('streamDirection',streamDirection)
        localStorage.setItem('gPSInterval',gPSInterval)
        localStorage.setItem('sectionID', sectionID)
        };

    /**
     * time interval for GPS update
     * @type {({text: string, value: number, key: string}|{text: string, value: number, key: string}|{text: string, value: number, key: string}|{text: string, value: number, key: string}|{text: string, value: number, key: string})[]}
     */
    const timeIntervalOptions = [
        {
            key:    '1s',
            text:   '1s',
            value:  1
        },
        {
            key:    '3s',
            text:   '3s',
            value:  3
        },
        {
            key:    '5s',
            text:   '5s',
            value:  5
        },
        {
            key:    '10s',
            text:   '10s',
            value:  10
        },
        {
            key:    '15s',
            text:   '15s',
            value:  15
        }
    ]

    return (
        <div className="PrelimDataAcq">
            <Header as='h1' textAlign='center' paddingTop="10px">
                <Header.Content>Preliminary Data Acquisition</Header.Content>
            </Header>
            <Segment className = "inputAreas">
                <Form onSubmit={handleSubmit}>
                    <Form.Field required>
                        <label>Name of Observer: </label>
                        <Popup content={'full name'} trigger={<Form.Input
                            placeholder='Your name here'
                            name='userName'
                            value={username}
                            onChange={handleUsernameChange}
                        />}
                               on = 'focus'
                               position = 'top left'
                               inverted
                        />
                    </Form.Field>

                    <Form.Field required>
                        <label>E-mail for .csv</label>
                        <Popup content={'email address to receive the survey outcome in .csv format'} trigger={<Form.Input
                            name='userEmail'
                            value={userEmail}
                            // error = {{content: 'invalid email address'}}
                            onChange={handleEmailChange}
                            />}
                               on = 'focus'
                               position = 'top left'
                               inverted
                        />
                    </Form.Field>
                    <Form.Field required>
                        <label>Stream: </label>
                        <Form.Input
                            placeholder='Stream name'
                            name='stream'
                            value={stream}
                            onChange={handleStreamChange}
                        />
                    </Form.Field>

                    <Form.Field required>
                        <label>Stream Section: </label>
                        <Form.Input
                            placeholder='Section/SubBasin'
                            name='streamSection'
                            value={streamSection}
                            onChange={handleStreamSectionChange}
                        />
                    </Form.Field>

                    <Form.Field required>
                        <label>Current Stream Direction:</label>
                        <div>
                            <Button.Group>
                                <Button
                                    className={`ui ${streamDirection === false ? "primary": ""} button`}
                                    onClick={() => {
                                    setStreamDirection(false);  // upstream
                                }}>UpStream</Button>
                                <Button
                                    className={`ui ${streamDirection === true ? "primary": ""} button`}
                                    onClick={() => {
                                    setStreamDirection(true);  // downstream
                                }}>DownStream</Button>
                            </Button.Group>
                        </div>
                    </Form.Field>

                    <label>Class/Section ID: </label>
                    <Form.Input
                        placeholder='#########'
                        name='sectionID'
                        value={sectionID}
                        onChange={handleSectionIDChange}
                    />
                    <label>Location Update Intervals:</label>
                    <Dropdown placeholder={'Select'}
                              fluid
                              selection
                              options={timeIntervalOptions}
                              defaultValue={timeIntervalOptions[0].value}
                              onChange={handleGPSIntervalChange}
                    />
                    <Button type="submit" color={'blue'}
                            disabled = {!username
                                || !userEmail
                            || !stream
                            || !streamSection
                            || streamDirection == null
                            }
                            onClick={() => {
                        window.location.href = "#/DataCollection"}}>Submit
                    </Button>
                </Form>

                <Button color={'blue'} onClick={() => {
                    window.location.href = "#/"}}>Back {/* Funny it send to address '/#/' */}
                </Button>

                <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={<Button color={'blue'}>Help</Button>}
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