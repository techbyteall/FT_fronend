import React, { useState } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { 
    Container, 
    Row, 
    Col,
    Button
} from "react-bootstrap";
import CheckBoxGroup  from '../../../components/CheckBoxGroup'
// import axios from 'axios';


registerAllModules();

const EventSetCreate = ({ onClose }) => {
  const initialData = [
    ['', '', '', '', '','']
  ];

  const [data, setData] = useState(initialData);

  const addEmptyRow = () => {
    setData(prevData => [...prevData, Array(5).fill('')]);
  };

  const removeEmptyRows = () => {
    setData(prevData => {
      const newData = prevData.filter(row => row.some(cell => cell !== undefined && cell !== null && cell !== ''));
      return newData;
    });
  };
  const handleClose = () => {
    onClose(); 
  };

  const saveData = () => {
    
  };


  const handleCloseModal = (saveData) => {
    setShowModal(false);
    if (!saveData) {
        setShowEventsList(true); // Показываем EventsList, если модальное окно закрывается без сохранения
    }
  };  

  const settings={
    data,
    rowHeaders: true,
    colHeaders: ['Date', 'Type', 'Name', 'Action', 'Value','Category'],
    height: 'auto',
    width: '950',
    columns: [
      { data: 1, type: "date", allowInvalid: false },
      { data: 2, type: "text" },
      { data: 3, type: "text"},
      { data: 4, type: "text" },
      { data: 5, type: "numeric"},
      { data: 6, type: "text" }
    ],
    colWidths: [150, 150, 150, 150, 150, 150],
    licenseKey: 'non-commercial-and-evaluation',
    filters: true,
    dropdownMenu: true,
    maxCols: 6,
  }

  return (
    <div className='event-set-create'>
      <Row>
        <Col>
            <h2>Create Event Set</h2>
        </Col>      
        <Col >
        <div className="d-flex justify-content-end">  
        
            <Button variant="primary" className="btn-sm" onClick={addEmptyRow} style={{ marginRight: '15px'}}>Add Empty Row</Button>
            <Button variant="primary" className="btn-sm" onClick={removeEmptyRows} style={{ marginRight: '15px'}}>Remove Empty Rows</Button>
            <Button variant="primary" className="btn-sm" onClick={saveData} style={{ marginRight: '15px'}}>Save</Button>
            <Button variant="secondary" className="btn-sm" onClick={handleClose} style={{ marginRight: '15px'}}>Close</Button>        
        </div>
        </Col>
      </Row>
      <div>
      <Row>
        <Col className="mt-3">
          <CheckBoxGroup />
            {/* <Row>
                <Col>
                    <input type="checkbox" />
                    <label>Name1</label>
                </Col> 
            </Row>
            <Row>
                <Col>
                    <input type="checkbox" />
                    <label>Name2</label>
                </Col>
            </Row> */}
        </Col>
        <Col className="mt-3">
            <HotTable settings={settings}/>
        </Col>
      </Row>
      </div>
      
    </div>
    
  );
};

export default EventSetCreate;
