import { 
    Container, 
    Row, 
    Col,
    Button
} from "react-bootstrap";
import EventModal from './EventModal';
import React, { useState } from 'react';
import 'handsontable/dist/handsontable.full.min.css';
import EventsList from "./EventsList"
import EventSetCreate from "./EventSetCreate";



export const Events = () => {
    const [showModal, setShowModal] = useState(false);
    const [showEventsList, setShowEventsList] = useState(true);
    const [showButton, setShowButton] = useState(true);

    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = (shouldShowEventsList) => {
        setShowModal(false);
        if (shouldShowEventsList) {
            setShowEventsList(true);
        }
    };
    
    const handleProceed = () => {
        setShowEventsList(false);
        setShowModal(false);
        setShowButton(false);
    };
    const handleShowEventsList = () => {
        setShowEventsList(true);
        setShowButton(true);
    };

    return (
        <div>
            <Row className="mt-3">
                <Col>
                    {showButton && ( 
                        <Button variant="primary" className="btn-sm" onClick={handleOpenModal} >Register EventSet</Button>
                    )}
                    <EventModal show={showModal}  handleClose={handleCloseModal} handleProceed={handleProceed}/> 
                </Col>                    
            </Row>
            
            <Row className="mt-3">
                <Col>
                    {showEventsList ? <EventsList /> : <EventSetCreate onClose={handleShowEventsList} />}
                </Col>
            </Row>
        </div>
  )
}
