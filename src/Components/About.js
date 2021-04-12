import React from 'react';
import {Header, Divider, Segment, Button, Modal} from 'semantic-ui-react';
import '../css/About.css';
function About() {
    const [open, setOpen] = React.useState(false)

            return (
                <div className={"About"}>
                    <Header size={'large'} color={'black'}>About Page</Header>
                    {/*<Segment placeholder className={"placeHolder"}>*/}
                    {/*    <p>this is the about page, Temp, can add description here or delete section</p>*/}
                    {/*</Segment>*/}
                    <Divider hidden/>

                    <Header size={'large'} color={'black'}>Project Description</Header>
                    <Segment placeholder className={"buttonHolder"}>
                        <p>Wet-Dry-Mapping is an app designed to help with the data collection process
                            associated with mapping streams. This product allows you to take GPS data points
                            while walking. During the data collection process you can say whether the stream
                            is Wet - Neither - Dry and if it is Wet then whether it is a Pool (Slow moving or no
                            movement)
                            or Riffle (Fast moving)
                        </p>
                    </Segment>
                    <Divider hidden/>
                    {/*<Header size={'large'} color={'black'}>Frequently Asked Questions</Header>*/}
                    {/*<Segment placeholder className={"placeHolder"}>*/}
                    {/*    <p>FAQ:</p>*/}
                    {/*    <p>Q1:" Temp "</p>*/}
                    {/*    <p>A1:" Temp "</p>*/}
                    {/*</Segment>*/}

                    {/*<Divider hidden/>*/}
                    <Header size={'large'} color={'black'}>Credits</Header>
                    <Segment placeholder className={"placeHolder"}>
                        <p>Streamers App Development Team:</p>
                        <p>Product Owner: Zong Deng</p>
                        <p>Project Technical Lead: Emma Ryden</p>
                        <p>Product Technicians: Jason Holtrey, Luke Johnston, Mike Boisvert</p>
                    </Segment>
                    <Segment bH className={"buttonHolder"}>
                    <p>
                        <Button color={'green'} onClick={() => {
                            window.location.href = "#/"
                        }}>Back</Button>
                        {/*<Popup*/}
                        {/*    trigger={<Button color={'green'}>Help (?)</Button>}*/}
                        {/*    content={'TESTING'}*/}
                        {/*    on={'click'}*/}
                        {/*/>*/}

                        <Modal
                            onClose={() => setOpen(false)}
                            onOpen={() => setOpen(true)}
                            open={open}
                            trigger={<Button color={'green'}>Help</Button>}
                        >
                            <Modal.Header>Help for the About Page</Modal.Header>
                            <Modal.Content image>
                                <Modal.Description>
                                    <p>
                                        The About page offers basic information about the app and features some general FAQs
                                    </p>
                                    <p>If you need specific help on any page please press the help button near the bottom</p>
                                </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='green' onClick={() => setOpen(false)}>
                                    Close Popup
                                </Button>
                            </Modal.Actions>
                        </Modal>
                    </p>
                </Segment>
                </div>
            );
}

export default About;