import React, { useState } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';

const AddServerModal = ({ show, handleClose, handleAdd }) => {
    const [serverName, setServerName] = useState('');
    const [serverURL, setServerURL] = useState('');
    const [comment, setComment] = useState('');

    const handleTestConnection = () => {
        console.log('Testing connection to server...');
    };

    const handleServerChange = (e) => {
        setServerName(e.target.value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleUrlChange = (e) => {
        setServerURL(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Отправляем данные на сервер:', JSON.stringify({
                serverName: serverName,
                serverURL: serverURL,
                comment: comment,
                statusServer: 'created'
            }));
            const response = await fetch(`${baseUrl}/api/servers_create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    serverName: serverName,
                    serverURL: serverURL,
                    comment: comment,
                    statusServer: 'created'
                }),
            });
            if (response.ok) {
                handleClose();
                setServerName('');
                setComment('');
                setServerURL('')
            } else {
                const data = await response.json();
                if (response.status === 400 && data.message === 'Name already exists') {
                    alert('Name already exists. Please enter a different name.');
                    setServerName('');
                    document.getElementById('serverName').focus();
                } else {
                    // Обработка других ошибок
                }
            }
        } catch (error) {
            console.error('Error saving model:', error);
        } 
    };

    const handleCancel = () => {
        setServerName('');
        setComment('');
        setServerURL('');
        handleClose(false);
    }
    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Register Server</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="serverName" className="row">
                        <Form.Label column sm={2}>Server Name</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter server name" 
                                value={serverName} 
                                onChange={handleServerChange} 
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="serverURL" className="row mt-3">
                        <Form.Label column sm={2}>Server URL</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter url" 
                                value={serverURL} 
                                onChange={handleUrlChange} 
                            />
                        </Col>
                    </Form.Group>
                    <Button 
                        variant="secondary" 
                        className="btn-sm" 
                        onClick={handleTestConnection}
                        style={{ marginRight: '23px', width: '150px', marginTop: 17 }}
                        >
                        Test Connection
                    </Button>
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
                            disabled={!serverName.trim()}                        
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
};

export default AddServerModal;
