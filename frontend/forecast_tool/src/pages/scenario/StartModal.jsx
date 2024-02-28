import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';

const StartModal = ({ show, handleClose, }) => {
    
    const [chooseScenario, setChooseScenario] = useState('');
    const [chooseServer, setChooseServer] = useState('');
    const [chooseScenarioList, setChooseScenarioList] = useState('');
    const [chooseServerList, setChooseServerList] = useState('');
    
    useEffect(() => {
        fetchScenarioSetList();
        fetchServerSetList();
    }, []);

    const fetchScenarioSetList = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/sc_status_list/');
            const data = await response.json();
            setChooseScenarioList(data.data); 
        } catch (error) {
            console.error('Error fetching event set list:', error);
        }
    };
    const fetchServerSetList = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/servers_list/');
            const data = await response.json();
            setChooseServerList(data.data); 
        } catch (error) {
            console.error('Error fetching event set list:', error);
        }
    };

    const handleChooseScenarioChange = (e) => {
        setChooseScenario(e.target.value);
    };
    const handleChooseServerChange = (e) => {
        setChooseServer(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/save_event/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chooseScenario: chooseScenario,
                    chooseServer: chooseServer,
                }),
            });
            if (response.ok) {
                handleClose();
                setChooseScenario('');
                setChooseServer('');
                } else {
                console.error('Error saving event:', error);
            }
        } catch (error) {
            console.error('Error saving event:', error);
        } 
    };
  
    const handleCancel = () => {
        setChooseScenario('');
        setChooseServer('');
        handleClose(false);
    }
  
    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Start Scenario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="chooseScenario" className="row mt-3">
                        <Form.Label column sm={2}>Choose Scenario</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                as="select"
                                value={chooseScenario} 
                                onChange={handleChooseScenarioChange}
                            >
                                <option value="">___</option>
                                {Array.isArray(chooseScenarioList) && chooseScenarioList.map(scenario => (
                                 <option key={scenario.scenario_id} value={scenario.scenario_name}>{scenario.scenario_name}</option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="chooseServer" className="row mt-3">
                        <Form.Label column sm={2}>Choose Server</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                as="select"
                                value={chooseServer} 
                                onChange={handleChooseServerChange}
                            >
                                <option value="">___</option>
                                {Array.isArray(chooseServerList) && chooseServerList.map(server => (
                                <option key={server.server_id} value={server.server_name}>{server.server_name}</option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <div className="mb-3"></div>
                    <div className="d-flex justify-content-end">
                        <Button 
                            variant="primary" 
                            className="btn-sm" 
                            onClick={handleSubmit} 
                            style={{ marginRight: '23px', width: '100px' }}
                            disabled={!chooseScenario || !chooseServer}
                        >
                            Start
                        </Button>
                        <Button 
                            variant="secondary" 
                            className="btn-sm" 
                            onClick={handleCancel}  
                            style={{ width: '100px' }}
                        >
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
} 

export default StartModal;
