import React from 'react';
import { Container, Input, Table } from 'semantic-ui-react';

function Confirmation()
{
    return (
        <div className={'Confirmation'}>
            <header className={"App-header"}>
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
                </Container>
                <br></br>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Just messing</Table.HeaderCell>
                            <Table.HeaderCell>with tables,</Table.HeaderCell>
                            <Table.HeaderCell>don't mind this</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                <p>
                    <button className={"App-button"} type={"button"} onClick={() => {window.location.href = "wet-dry#/"}}>
                        Back
                    </button>
                    <button className={"App-button"} type={"button"} onClick={() => {window.location.href = "wet-dry/#/About"}}>
                        Confirm
                    </button>
                </p>
            </header>
        </div>
    );

};


export default Confirmation;