import React, { useState } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { Container, Row, Col, Button } from "react-bootstrap";
import CheckBoxGroup  from '../../../components/CheckBoxGroup';
import axios from 'axios';

registerAllModules();

const EventSetCreate = ({ onClose, eventsSetId }) => {
    const initialData = [
        ['', '', '', '', '','']
    ];

    const [data, setData] = useState(initialData);

    const addEmptyRow = () => {
        setData(prevData => [...prevData, Array(6).fill('')]);
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

    const saveData = async () => {
        const jsonDataArray = [];
        data.forEach(rowData => {
            const jsonData = {
                date_time: rowData[0],
                object_type: rowData[1],
                object_instance: rowData[2],
                object_type_property: rowData[3],
                value: rowData[4],
                sub_data_source: rowData[5],
                data_source_id: eventsSetId 
            };
            jsonDataArray.push(jsonData);
            console.log('Data saved successfully:', jsonDataArray);
        });

        axios.post('http://localhost:8000/api/save_events/', jsonDataArray)
            .then(response => {
                console.log('Data saved successfully:', response.data);
            })
            .catch(error => {
                console.error('Error saving data:', error);
            });
    };

    const settings={
        data,
        rowHeaders: true,
        colHeaders: ['Date', 'Type', 'Name', 'Action', 'Value','Category'],
        height: 'auto',
        width: '950',
        columns: [
            { data: 0, type: "date", allowInvalid: false },
            { data: 1, type: "text" },
            { data: 2, type: "text"},
            { data: 3, type: "text" },
            { data: 4, type: "numeric"},
            { data: 5, type: "text" }
        ],
        colWidths: [150, 150, 150, 150, 150, 150],
        licenseKey: 'non-commercial-and-evaluation',
        filters: true,
        dropdownMenu: true,
        maxCols: 6,
    };

    return (
        <div className='event-set-create'>
            <Row>
                <Col>
                    <h2>Create Event Set</h2>
                </Col>      
                <Col>
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
