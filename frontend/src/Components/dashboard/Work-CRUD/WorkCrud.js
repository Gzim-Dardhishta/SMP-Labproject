import React from 'react'
import Holidays from './Holidays'
import Events from './Events'
import Units from './Units'
import NewHires from './NewHires'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import ManageUsers from './ManageUsers'
import WorkProfession from './WorkProfession'

const GzimCrud = () => {
    return (
        <>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={2}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Holidays</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Events</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Units</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fourth">New Hires</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fifth">Manage Users</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="sixth">WorkProfession</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Holidays />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Events />
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <Units />
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">
                                <NewHires />
                            </Tab.Pane>
                            <Tab.Pane eventKey="fifth">
                                <ManageUsers />
                            </Tab.Pane>
                            <Tab.Pane eventKey="sixth">
                                <WorkProfession />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    )
}

export default GzimCrud