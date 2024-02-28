import { Container, Row, Col, Button, Table } from "react-bootstrap";
import  ModelsList from "./ModelsList"
import React, { useState } from 'react';
import ModelModal from "./ModelModal";

export const Models = () => {
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
                    <Button variant="primary" className="btn-sm" onClick={handleOpenModal}>Register Model</Button>{' '}
                    <ModelModal show={showModal} handleClose={handleCloseModal}  /> 
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <div>
                        <ModelsList />
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default Models;