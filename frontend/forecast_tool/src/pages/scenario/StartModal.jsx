import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import axios from 'axios'
import { saveAs } from 'file-saver'

const StartModal = ({ show, handleClose, isDataUpdated, setIsDataUpdated}) => {
    
    const [chooseScenario, setChooseScenario] = useState('');
    const [chooseServer, setChooseServer] = useState('');
    const [chooseScenarioList, setChooseScenarioList] = useState('');
    const [chooseServerList, setChooseServerList] = useState('');
    
    useEffect(() => {
        fetchScenarioSetList();
        fetchServerSetList();
    }, [isDataUpdated]);

    const fetchScenarioSetList = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/sc_status_list/');
            const data = await response.json();
            setChooseScenarioList(data.data);
            setIsDataUpdated(false); 
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

    const updateScenario = async (scenarioName, serverName) => {
        try {
            await axios.put(`http://localhost:8000/api/scenarios/${scenarioName}/`, { server: serverName });
        } catch (error) {
            console.error('Error updating scenario:', error);
        }
    };
    
    const fetchCSVData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/export_scenario/', {
                params: { chooseScenario: chooseScenario }});
            const blob = new Blob([response.data.events_csv], { type: 'text/csv' });
            const blobT = new Blob([response.data.trends_csv], { type: 'text/csv' });
            
            saveAs(blob, 'Events1.csv');
            saveAs(blobT, 'Trends1.csv');
            if (response.status === 200) {
                // handleRunScenario();
                console.log("ok");
            } else {
                console.error('Export CSV failed:', response.data);
            }
        } catch (error) {
            console.error('Error fetching CSV data:', error);
        }
    };
    const handleRunScenario = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/run_scenario/'); 
            console.log(response.data); 
        } catch (error) {
            console.error('Error running scenario:', error);
        }
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            handleClose();
            setChooseScenario('');
            setChooseServer('');
            await updateScenario(chooseScenario, chooseServer);
            setIsDataUpdated(true);
            fetchCSVData();
            
            // runScenario();
        } catch (error) {
            console.error('Error exporting CSV:', error);
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
