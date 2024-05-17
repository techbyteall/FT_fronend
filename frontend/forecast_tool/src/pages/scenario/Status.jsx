import { Container, Row, Col, Button, Table } from "react-bootstrap";
import React, { useState } from 'react';
import StatusList from "./StatusList";
import StatusModal from "./StatusModal";
import StartModal from "./StartModal";

import baseUrl from "../../links";

export const Status = () => {
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showStartModal, setShowStartModal] = useState(false);
    const [isDataUpdated, setIsDataUpdated] = useState(false); // Добавляем состояние для отслеживания обновления данных
    const [chooseScenarioList, setChooseScenarioList] = useState([]);

    const handleOpenModalSts = () => {
        setShowStatusModal(true);
    };
    const handleCloseModalSts = () => {
        setShowStatusModal(false);
        setIsDataUpdated(true);
    };
    const handleOpenModalStt = () => {
        setShowStartModal(true);
        setIsDataUpdated(true);
    };
    const handleCloseModalStt = () => {
        setShowStartModal(false);
        
    };
    const fetchScenarioSetList = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/sc_status_list/`);
            const data = await response.json();
            setChooseScenarioList(data.data);
            setIsDataUpdated(false); 
        } catch (error) {
            console.error('Error fetching event set list:', error);
        }
    };

    return (
        <div>
            <Row className="mt-3">
                <Col>
                    <Button variant="primary" className="btn-sm" onClick={handleOpenModalSts}>Register Scenario</Button>{' '}
                    <Button variant="primary" className="btn-sm" onClick={handleOpenModalStt}>Start</Button>{' '}
                    <StatusModal 
                        show={showStatusModal} 
                        handleClose={handleCloseModalSts} 
                        updateScenarioList={fetchScenarioSetList} /> 
                    <StartModal 
                        show={showStartModal} 
                        handleClose={handleCloseModalStt} 
                        isDataUpdated={isDataUpdated} 
                        setIsDataUpdated={setIsDataUpdated} /> 
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <div>
                        <StatusList 
                            isDataUpdated={isDataUpdated} 
                            setIsDataUpdated={setIsDataUpdated} />
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default Status;