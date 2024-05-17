import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';

import baseUrl from '../../../links';

const ModelModal = ({ show, handleClose }) => {
    const [modelName, setModelName] = useState('');
    const [comment, setComment] = useState('');
    const [location, setLocation] = useState('');
    
    const handleInputChange = (e) => {
        setModelName(e.target.value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setLocation(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('modelName', modelName);
            formData.append('comment', comment);
            formData.append('file', location); 
    
            const response = await fetch(`${baseUrl}/api/save_model/`, {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                handleClose();
                setModelName('');
                setComment('');
                setLocation('');
            } else {
                const data = await response.json();
                if (response.status === 400 && data.message === 'Name already exists') {
                    alert('Name already exists. Please enter a different name.');
                    setModelName('');
                    document.getElementById('modelName').focus();
                } else {
                    // Handle other errors
                }
            }
        } catch (error) {
            console.error('Error saving model:', error);
        } 
    };
  
    const handleCancel = () => {
        setModelName('');
        setComment('');
        setLocation('');
        handleClose(false);
    }
  
    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Register Model</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="modelName" className="row">
                        <Form.Label column sm={2}>Model name</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter model name" 
                                value={modelName} 
                                onChange={handleInputChange} 
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="location" className="row mt-3">
                        <Form.Label column sm={2}>Location</Form.Label>
                        <Col sm={2}>
                            <Button 
                                variant="secondary" 
                                className="btn-sm" 
                                onClick={() => document.getElementById('fileInput').click()} 
                                style={{ width: '110px', height: '38px',fontSize: '15px'  }}
                                >
                                Open Folder
                            </Button>
                            <input 
                                id="fileInput" 
                                type="file" 
                                style={{ display: 'none' }} 
                                onChange={handleFileChange} 
                            />
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
                            disabled={!modelName.trim()}                        
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

export default ModelModal;
