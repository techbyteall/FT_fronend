import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';


const StatusModal = ({ show, handleClose, updateScenarioList  }) => {
    const [statusScName, setStatusScName] = useState('');
    const [comment, setComment] = useState('');
    const [model, setModel] = useState('');
    const [event, setEvent] = useState('');
    const [trend, setTrend] = useState('');
    const [modelSetList, setModelSetList] = useState([]);
    const [eventSetList, setEventSetList] = useState([]);
    const [trendSetList, setTrendSetList] = useState([]);

    useEffect(() => {
        fetchModelSetList();
        fetchEventSetList();
        fetchTrendSetList();
    }, []);

    const fetchModelSetList = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/models_set/');
            const data = await response.json();
            setModelSetList(data.data); 
        } catch (error) {
            console.error('Error fetching event set list:', error);
        }
    };
    const fetchEventSetList = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/events_set_list/');
            const data = await response.json();
            setEventSetList(data.data); 
        } catch (error) {
            console.error('Error fetching event set list:', error);
        }
    };
    const fetchTrendSetList = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/trends_set_list/');
            const data = await response.json();
            setTrendSetList(data.data); 
        } catch (error) {
            console.error('Error fetching event set list:', error);
        }
    };

    const handleInputChange = (e) => {
        setStatusScName(e.target.value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleModelChange = (e) => {
        setModel(e.target.value);
    };
    const handleEventChange = (e) => {
        setEvent(e.target.value);
    };
    const handleTrendChange = (e) => {
        setTrend(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // statusSc = 'created'
            const response = await fetch('http://localhost:8000/api/save_scenario/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    statusScName: statusScName,
                    model: model,
                    event: event,
                    trend: trend,
                    // status: statusSc,
                    comment: comment,
                }),
            });
            if (response.ok) {
                handleClose();
                setStatusScName('');
                setModel('');
                setEvent('');
                setTrend('');
                setComment('');
                updateScenarioList();
            } else {
                const data = await response.json();
                if (response.status === 400 && data.message === 'Name already exists') {
                    alert('Name already exists. Please enter a different name.');
                    statusScName('');
                    document.getElementById('statusScName').focus();
                } else {
                    // Обработка других ошибок
                }
            }
        } catch (error) {
            console.error('Error saving event:', error);
        } 
    };
  
    const handleCancel = () => {
        setStatusScName('');
        setComment('');
        setModel('');
        setEvent('');
        setTrend('');
        handleClose(false);
    }
  
    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Register Scenario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="statusScName" className="row">
                        <Form.Label column sm={2}>Name</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Scenario name" 
                                value={statusScName} 
                                onChange={handleInputChange} 
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="model" className="row mt-3">
                        <Form.Label column sm={2}>Model</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                as="select"
                                value={model} 
                                onChange={handleModelChange}
                            >
                                <option value="">___</option>
                                {Array.isArray(modelSetList) && modelSetList.map(modelSet => (
                                    <option key={modelSet.models_id} value={modelSet.models_name}>{modelSet.models_name}</option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="event" className="row mt-3">
                        <Form.Label column sm={2}>Events</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                as="select"
                                value={event} 
                                onChange={handleEventChange}
                            >
                                <option value="">___</option>
                                {Array.isArray(eventSetList) && eventSetList.map(eventSet => (
                                    <option key={eventSet.events_set_id} value={eventSet.events_set__name}>{eventSet.events_set_name}</option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="trend" className="row mt-3">
                        <Form.Label column sm={2}>Trends</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                as="select"
                                value={trend} 
                                onChange={handleTrendChange}
                            >
                                <option value="">___</option>
                                {Array.isArray(trendSetList) && trendSetList.map(trendSet => (
                                    <option key={trendSet.trends_set_id} value={trendSet.trends_set__name}>{trendSet.trends_set_name}</option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="comment" className="row mt-3">
                        <Form.Label column sm={2}>Comment</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                as="textarea" 
                                rows={4} 
                                placeholder="Enter comment" 
                                value={comment} 
                                onChange={handleCommentChange}
                            />
                        </Col>
                    </Form.Group>
                    <div className="mb-3"></div>
                    <div className="d-flex justify-content-end">
                        <Button 
                            variant="primary" 
                            className="btn-sm" 
                            onClick={handleSubmit} 
                            style={{ marginRight: '23px', width: '100px' }}
                            disabled={!statusScName.trim()}
                        >
                            Proceed
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

export default StatusModal;
