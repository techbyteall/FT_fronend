import React, { useState } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { Container, Row, Col, Button } from "react-bootstrap";
import CheckBoxGroupTR  from '../../../components/CheckBoxGroupTR';
import axios from 'axios';

registerAllModules();

const TrendSetCreate = ({ onClose, trendsSetId }) => {
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
                object_instance: rowData[0],
                object_type: rowData[1],
                date_time: rowData[2],  
                object_type_property: rowData[3],
                value: rowData[4],
                sub_data_source: rowData[5],
                data_source_id: trendsSetId 
            };
            jsonDataArray.push(jsonData);
            console.log('Data saved successfully:', jsonDataArray);
        });
        axios.post('http://localhost:8000/api/save_trends/', jsonDataArray)
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
        colHeaders: ['Well', 'Well Type', 'GOR init date', 'GOR init value', 'GOR Slop','Commets'],
        height: 'auto',
        width: '1100',
        columns: [
            { data: 0, type: "text" },
            { data: 1, type: "text"},
            { data: 2, type: "date", allowInvalid: false },
            { data: 3, type: "text" },
            { data: 4, type: "numeric"},
            { data: 5, type: "text" }
        ],
        colWidths: [150, 150, 150, 150, 150, 300],
        licenseKey: 'non-commercial-and-evaluation',
        filters: true,
        dropdownMenu: true,
        maxCols: 6,
    };
    return (
        <div className='event-set-create'>
            <Row>
                <Col>
                    <div style={{ textAlign: 'right', fontSize: '28px' }}>Create Trend Set</div>
                </Col>      
                <Col>
                    
                    <div className="d-flex justify-content-end">  
                        <Button variant="secondary" className="btn-sm" onClick={handleClose} style={{ marginRight: '15px'}}>Close</Button>
                        <Button variant="secondary" className="btn-sm" onClick={addEmptyRow} style={{ marginRight: '15px'}}>Add Empty Row</Button>
                        <Button variant="secondary" className="btn-sm" onClick={removeEmptyRows} style={{ marginRight: '15px'}}>Remove Empty Rows</Button>
                        <Button variant="primary" className="btn-sm" onClick={saveData} style={{ marginRight: '15px'}}>Save</Button>  
                    </div>
                </Col>
            </Row>
            <div>
                <Row>
                    <Col>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <Button variant="primary" className="btn-sm" style={{ width: '300px' }}>GOR</Button>
                            <Button variant="primary" className="btn-sm" style={{ width: '300px' }}>SBHP</Button>
                            <Button variant="primary" className="btn-sm" style={{ width: '300px' }}>Watercut</Button>
                        </div>
                        <div className="mt-3">
                        <CheckBoxGroupTR />
                        </div>
                    </Col>
                    <Col className="mt-3">
                        <HotTable settings={settings}/>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default TrendSetCreate;
