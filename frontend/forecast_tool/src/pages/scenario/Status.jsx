import { Container, Row, Col, Button, Table } from "react-bootstrap";
import React, { useState } from 'react';
import StatusList from "./StatusList";
import StatusModal from "./StatusModal";
import StartModal from "./StartModal";

export const Status = () => {
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showStartModal, setShowStartModal] = useState(false);

    const handleOpenModalSts = () => {
        setShowStatusModal(true);
    };
    const handleCloseModalSts = () => {
        setShowStatusModal(false);
    };
    const handleOpenModalStt = () => {
        setShowStartModal(true);
    };
    const handleCloseModalStt = () => {
        setShowStartModal(false);
    };

    return (
        <div>
            <Row className="mt-3">
                <Col>
                    <Button variant="primary" className="btn-sm" onClick={handleOpenModalSts}>Register Scenario</Button>{' '}
                    <Button variant="primary" className="btn-sm" onClick={handleOpenModalStt}>Start</Button>{' '}
                    <StatusModal show={showStatusModal} handleClose={handleCloseModalSts}  /> 
                    <StartModal show={showStartModal} handleClose={handleCloseModalStt}  /> 
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <div>
                        <StatusList />
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default Status;