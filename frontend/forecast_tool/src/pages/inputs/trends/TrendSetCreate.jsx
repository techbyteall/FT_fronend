import React, { useState } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { Container, Row, Col, Button } from "react-bootstrap";
import CheckBoxGroupTR  from '../../../components/CheckBoxGroupTR';
import axios from 'axios';
import '../../../index.css'
registerAllModules();

const TrendSetCreate = ({ onClose, trendsSetId, selectTrendsSetId }) => {
    const initialGorData = [
        ['', '', '', '', '', '']
    ];
    
    const initialSbhpData = [
        ['', '', '', '', '', '']
    ];
    
    const initialWatercutData = [
        ['', '', '', '', '', '']
    ];
    
    const [gorData, setGorData] = useState(initialGorData);
    const [sbhpData, setSbhpData] = useState(initialSbhpData);
    const [watercutData, setWatercutData] = useState(initialWatercutData);
    const [currentTableType, setCurrentTableType] = useState('GOR');

    const addEmptyRow = () => {
        const newData = ['', '', '', '', '', ''];
        if (currentTableType === 'GOR') setGorData(prevData => [...prevData, newData]);
        else if (currentTableType === 'SBHP') setSbhpData(prevData => [...prevData, newData]);
        else if (currentTableType === 'Watercut') setWatercutData(prevData => [...prevData, newData]);
    };

    const removeEmptyRows = () => {
        let newData;
        if (currentTableType === 'GOR') {
            newData = gorData.filter(row => row.some(cell => cell !== undefined && cell !== null && cell !== ''));//(row => row.length > 0 && row.some(cell => cell.trim() !== ''));
            setGorData(newData);
        } else if (currentTableType === 'SBHP') {
            newData = sbhpData.filter(row => row.some(cell => cell !== undefined && cell !== null && cell !== ''));//(row => row.length > 0 && row.some(cell => cell.trim() !== ''));
            setSbhpData(newData);
        } else if (currentTableType === 'Watercut') {
            newData = watercutData.filter(row => row.some(cell => cell !== undefined && cell !== null && cell !== ''));//(row => row.length > 0 && row.some(cell => cell.trim() !== ''));
            setWatercutData(newData);
        }
    };

    const handleClose = () => {
        onClose();
    };

    const saveData = async () => {
        const jsonDataArray = [];
    
        const tablesData = [
            { type: 'GOR', data: gorData },
            { type: 'SBHP', data: sbhpData },
            { type: 'Watercut', data: watercutData }
        ];
    
        tablesData.forEach(table => {
            const { type, data } = table;
            data.forEach(rowData => {
                const jsonData = {
                    object_instance: rowData[0],
                    date_time: 0,
                    value: [
                        rowData[2],
                        rowData[3],
                        rowData[4],
                        rowData[5],
                        rowData[6],
                        rowData[7],
                        rowData[8],
                        rowData[9]
                    ],
                    description: rowData[10],
                    data_source_id: trendsSetId,
                    sub_data_source: type
                };
                jsonDataArray.push(jsonData);
            });
        });
    
        axios.post('http://localhost:8000/api/save_trends/', jsonDataArray)
            .then(response => {
                console.log('Data saved successfully:', response.data);
            })
            .catch(error => {
                console.error('Error saving data:', error);
            });
    };
    

    const getSettingsByTableType = (type) => {
        let data, colHeaders;
        if (type === 'GOR') {
            data = gorData;
            colHeaders = ['Well', 'Well Type', 'GOR init date', 'GOR init value', 'GOR Slope', 'c6_gor','c5_gor','c4_gor','c3_gor','c2_gor', 'Comments'];
        } else if (type === 'SBHP') {
            data = sbhpData;
            colHeaders = ['Well', 'Well Type', 'SBHP init date', 'SBHP init value', 'SBHP Slope', 'c6_sbhp','c5_sbhp','c4_sbhp','c3_sbhp','c2_sbhp', 'Comments'];
        } else if (type === 'Watercut') {
            data = watercutData;
            colHeaders = ['Well', 'Well Type', 'Watercut init date', 'Watercut init value', 'Watercut Slope', 'c6_watercut','c5_watercut','c4_watercut','c3_watercut','c2_watercut', 'Comments'];
        }

        return {
            data,
            rowHeaders: true,
            colHeaders,
            autoColumnSize: true,
            width: 'auto',
            stretchH:'all',
            columns: [
                { data: 0, type: "text" },
                { data: 1, type: "text" },
                { data: 2, type: "text" },
                { data: 3, type: "numeric" },
                { data: 4, type: "numeric" },
                { data: 5, type: "numeric" },
                { data: 6, type: "numeric" },
                { data: 7, type: "numeric" },
                { data: 8, type: "numeric" },
                { data: 9, type: "numeric" },
                { data: 10, type: "text" }
            ],
            colWidths: 'auto',
            licenseKey: 'non-commercial-and-evaluation',
            filters: true,
            dropdownMenu: true,
            maxCols: 11,
        };
    };

    const handleTableTypeChange = (type) => {
        setCurrentTableType(type);
    };

    return (
        <div className='event-set-create'>
            <Row>
                <Col>
                    <div style={{ textAlign: 'center', fontSize: '28px' }}>Create Trend Set</div>
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
                        <div className="mt-3" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <Button 
                              variant={currentTableType === 'GOR' ? 'primary' : 'secondary'} 
                              className="btn-sm" 
                              style={{ width: '200px' }}
                              onClick={() => handleTableTypeChange('GOR')}
                              >GOR</Button>
                            <Button 
                              variant={currentTableType === 'SBHP' ? 'primary' : 'secondary'}
                              className="btn-sm" style={{ width: '200px' }}
                              onClick={() => handleTableTypeChange('SBHP')}
                              >SBHP</Button>
                            <Button 
                              variant={currentTableType === 'Watercut' ? 'primary' : 'secondary'}
                              className="btn-sm" 
                              style={{ width: '200px' }}
                              onClick={() => handleTableTypeChange('Watercut')}
                              >Watercut</Button>
                        </div>
                        <div className="mt-3" lg={2}>
                        <CheckBoxGroupTR />
                        </div>
                    </Col>
                    <Col className="mt-3" lg={10}>
                        <HotTable settings={getSettingsByTableType(currentTableType)} />
                    </Col>
                </Row>
            </div>
         </div>
    );
};

export default TrendSetCreate;
