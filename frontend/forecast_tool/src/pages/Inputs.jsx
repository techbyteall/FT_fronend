
import { Navbar, Nav, Container, Tabs, Tab  } from "react-bootstrap";
import { Models } from "./inputs/models/Models"
import { Events } from "./inputs/events/Events"
import { Trends } from "./inputs/trends/Trends"

import React from "react";

export const Inputs = () => { 
    return (
        
        <Container fluid>
            <Tab.Container id="left-tabs-example"  defaultActiveKey="models-tab">
                <Nav variant="underline"> 
                    <Nav.Item>
                        <Nav.Link eventKey="models-tab" className="navbar-item">Models</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="events-tab" className="navbar-item">Events</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="trends-tab" className="navbar-item">Trends</Nav.Link>
                    </Nav.Item>
                </Nav>
            
                <Tab.Content>
                    <Tab.Pane eventKey="models-tab"><Models /></Tab.Pane>
                    <Tab.Pane eventKey="events-tab"><Events /></Tab.Pane>
                    <Tab.Pane eventKey="trends-tab"><Trends /></Tab.Pane>
                </Tab.Content>
            </Tab.Container>
            </Container>  
    )
}
