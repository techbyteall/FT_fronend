import React, { useState } from 'react';
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import TrendsList from "./TrendsList";
import TrendModal from './TrendModal';
import TrendSetCreate from "./TrendSetCreate";

export const Trends = () => {
    const [showModal, setShowModal] = useState(false);
    const [showTrendsList, setShowTrendsList] = useState(true);
    const [showButton, setShowButton] = useState(true);
    const [trendsSetId, setTrendsSetId] = useState(null);

    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = (shouldShowTrendsList) => {
        setShowModal(false);
        if (shouldShowTrendsList) {
            setShowTrendsList(true);
        }
    };
    const handleProceed = () => {
        setShowTrendsList(false);
        setShowModal(false);
        setShowButton(false);
    };
    const handleShowTrendsList = () => {
        setShowTrendsList(true);
        setShowButton(true);
    };
    const handleSetTrendSetId = (trendId) => {
        setTrendsSetId(trendId);
    };

    return (
        <div>
            <Row className="mt-3">
                <Col>
                    {showButton && ( 
                        <Button variant="primary" className="btn-sm" onClick={handleOpenModal}>Register TrendSet</Button>
                    )}
                    <TrendModal show={showModal} handleClose={handleCloseModal} handleProceed={handleProceed} setTrendSetId={handleSetTrendSetId}/>  {/*setEventSetId={handleSetTrendSetId}*/}
                </Col>                    
            </Row>
            <Row className="mt-3">
                <Col>
                    {showTrendsList ? <TrendsList /> : <TrendSetCreate onClose={handleShowTrendsList} trendsSetId={trendsSetId} />}
                </Col>
            </Row>
        </div>
    )
}
