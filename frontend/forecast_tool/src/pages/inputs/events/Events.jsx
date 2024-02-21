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



export const Events = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };    

    return (
        <div>
            <Row className="mt-3">
                <Col>
                    <Button variant="primary" className="btn-sm" onClick={handleOpenModal} >Register EventSet</Button>{' '}
                    <EventModal show={showModal}  handleClose={handleCloseModal}/> 
                </Col>                    
            </Row>
            <Row className="mt-3">
                <Col>
                    <EventsList />
                </Col>
            </Row>
        </div>
  )
}
