import React, { useState } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import EventModal from './EventModal';
import EventsList from "./EventsList";
import EventSetCreate from "./EventSetCreate";

export const Events = () => {
    const [showModal, setShowModal] = useState(false);
    const [showEventsList, setShowEventsList] = useState(true);
    const [showButton, setShowButton] = useState(true);
    const [eventsSetId, setEventsSetId] = useState(null);
    const [selectEventsSetId, setSelectEventsSetId] = useState(null);

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
    const handleSetEventSetId = (eventId) => {
        setEventsSetId(eventId);
    };
    const handleSetSelectEventSetId = (selectEventId) => {
        setSelectEventsSetId(selectEventId);
    };
    return (
        <div>
            <Row className="mt-3">
                <Col>
                    {showButton && ( 
                        <Button variant="primary" className="btn-sm" onClick={handleOpenModal}>Register EventSet</Button>
                    )}
                    <EventModal 
                        show={showModal} 
                        handleClose={handleCloseModal} 
                        handleProceed={handleProceed} 
                        setEventSetId={handleSetEventSetId}
                        setSelectEventsSetId={handleSetSelectEventSetId}
                    /> 
                </Col>                    
            </Row>
            <Row className="mt-3">
                <Col>
                    {showEventsList ? <EventsList /> : <EventSetCreate 
                                        onClose={handleShowEventsList} 
                                        eventsSetId={eventsSetId} 
                                        selectEventsSetId={selectEventsSetId}/>}
                </Col>
            </Row>
        </div>
    );
}
