import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';

import baseUrl from '../../../links';

const TrendModal = ({ show, handleClose, handleProceed, setTrendSetId, setSelectTrendsSetId }) => {
    const [trendName, setTrendName] = useState('');
    const [comment, setComment] = useState('');
    const [choose, setChoose] = useState('');
    const [trendSetList, setTrendSetList] = useState([]);

    useEffect(() => {
        fetchTrendSetList();
    }, []);

    const fetchTrendSetList = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/trends_set_list/`);
            const data = await response.json();
            setTrendSetList(data); 
        } catch (error) {
            console.error('Error fetching trend set list:', error);
        }
    };

    const handleInputChange = (e) => {
        setTrendName(e.target.value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleChooseChange = (e) => {
        setChoose(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${baseUrl}/api/save_trend/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    trendName: trendName,
                    comment: comment,
                    choose: choose,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                handleClose();
                handleProceed();
                setTrendName('');
                setComment('');
                setTrendSetId(data.trends_set_id);
                if (data.selected_trend_id !== undefined && data.selected_trend_id !== null) {
                    setSelectTrendsSetId(data.selected_trend_id);
                }
            } else {
                const data = await response.json();
                if (response.status === 400 && data.message === 'Name already exists') {
                    alert('Name already exists. Please enter a different name.');
                    setTrendName('');
                    document.getElementById('trendName').focus();
                } else {
                    // Обработка других ошибок
                }
            }
            setChoose('');
        } catch (error) {
            console.error('Error saving trend:', error);
        } 
    };
  
    const handleCancel = () => {
        setTrendName('');
        setComment('');
        setChoose('');
        handleClose(false);
    }
  
    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Register TrendSet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="trendName" className="row">
                        <Form.Label column sm={2}>Name</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter trend name" 
                                value={trendName} 
                                onChange={handleInputChange} 
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="choose" className="row mt-3">
                        <Form.Label column sm={2}>Choose Set</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                as="select"
                                value={choose} 
                                onChange={handleChooseChange}
                            >
                                <option value="">Blank</option>
                                {Array.isArray(trendSetList) && trendSetList.map(trendSet => (
                                    <option key={trendSet.trends_set_id} value={trendSet.trends_set_name}>{trendSet.trends_set_name}</option> // Исправил ключи и значения
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
                            disabled={!trendName.trim()}
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

export default TrendModal;
