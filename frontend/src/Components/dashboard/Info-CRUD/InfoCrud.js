import React from 'react'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import PersonalData from './PersonalData';
import Department from './Department';
import WorkType from './WorkType';
import Tasks from './Tasks';
import Countries from './Countries';
import AddressContact from './AddressContact';

const BlinCrud = () => {
    return (
        <>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={2}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Personal Data</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Departments</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Work Type</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="forth">Tasks</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fifth">Countries</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="sixth">AddressContact</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <PersonalData />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Department />
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <WorkType />
                            </Tab.Pane>
                            <Tab.Pane eventKey="forth">
                                <Tasks />
                            </Tab.Pane>
                            <Tab.Pane eventKey="fifth">
                                <Countries />
                            </Tab.Pane>
                            <Tab.Pane eventKey="sixth">
                                <AddressContact />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    )
}

export default BlinCrud