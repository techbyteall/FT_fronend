import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';


const EventModal = ({ show, handleClose }) => {
  const [eventName, setEventName] = useState('');
  const [comment, setComment] = useState('');
  const [choose, setChoose] = useState('');

  const [eventSetList, setEventSetList] = useState([]);
  useEffect(() => {
    // Загрузка списка событий при монтировании компонента
    fetchEventSetList();
  }, []);

  const fetchEventSetList = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/events_set_list/');
      const data = await response.json();
      setEventSetList(data.data); // Установка полученного списка в состояние
      console.log(data)
    } catch (error) {
      console.error('Error fetching event set list:', error);
    }
  };

  const handleInputChange = (e) => {
    setEventName(e.target.value);
  };
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const handleChooseChange = (e) => {
    setChoose(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose(); 
  };
  const handleCancel = () => {
    resetForm();
    setShowModal(false);
  }
  const resetForm = () => {
    setEventName('');
    setComment('');
    setChoose('');
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register EventSet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="eventName" className="row">
            <Form.Label column sm={2}>Name</Form.Label>
            <Col sm={10}>
              <Form.Control 
                type="text" 
                placeholder="Enter event name" 
                value={eventName} 
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
                <option value="">Blanc</option>
                {Array.isArray(eventSetList) && eventSetList.map(eventSet => (
                  <option key={eventSet.events_set_id} value={eventSet.events_set_name}>{eventSet.events_set_name}</option>
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
            <Button variant="primary" className="btn-sm" type="submit" style={{ marginRight: '23px', width: '100px' }}>Proceed</Button>
            <Button variant="secondary" className="btn-sm" type= {{ handleCancel }} style={{ width: '100px' }}>Cancel</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EventModal;
