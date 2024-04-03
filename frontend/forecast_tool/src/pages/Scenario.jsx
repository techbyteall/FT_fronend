import { Navbar, Nav, Container, Tabs, Tab  } from "react-bootstrap";
import React from "react";
import { Status } from "./scenario/Status";
import Results from "./scenario/Results";

export const Scenario = () => { 
    return (
        <Container fluid>
            <Tab.Container id="left-tabs-example"  defaultActiveKey="status-tab">
                <Nav variant="underline"> 
                    <Nav.Item>
                        <Nav.Link eventKey="status-tab" className="navbar-item">Status</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="results-tab" className="navbar-item">Results</Nav.Link>
                    </Nav.Item>
                </Nav>
            
                <Tab.Content>
                    <Tab.Pane eventKey="status-tab"><Status /></Tab.Pane>
                    <Tab.Pane eventKey="results-tab"><Results /></Tab.Pane>
                </Tab.Content>
            </Tab.Container>
            </Container>  
    )
}
