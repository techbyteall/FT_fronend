import React, { useState } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { Container, Row, Col, Button } from "react-bootstrap";
import CheckBoxGroupTR  from '../../../components/CheckBoxGroupTR';
import axios from 'axios';
import '../../../index.css'
import baseUrl from '../../../links';

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
    const initialPiData = [
        ['', '', '', '', '', '']
    ];
    
    const [gorData, setGorData] = useState(initialGorData);
    const [sbhpData, setSbhpData] = useState(initialSbhpData);
    const [watercutData, setWatercutData] = useState(initialWatercutData);
    const [piData, setPiData] = useState(initialPiData);
    const [currentTableType, setCurrentTableType] = useState('GOR');

    const addEmptyRow = () => {
        const newData = ['', '', '', '', '', ''];
        if (currentTableType === 'GOR') setGorData(prevData => [...prevData, newData]);
        else if (currentTableType === 'SBHP') setSbhpData(prevData => [...prevData, newData]);
        else if (currentTableType === 'Watercut') setWatercutData(prevData => [...prevData, newData]);
        else if (currentTableType === 'PI') setPiData(prevData => [...prevData, newData]);
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
        else if (currentTableType === 'PI') {
            newData = piData.filter(row => row.some(cell => cell !== undefined && cell !== null && cell !== ''));//(row => row.length > 0 && row.some(cell => cell.trim() !== ''));
            setPiData(newData);
        }
    };

    const handleClose = () => {
        onClose();
    };

    // const saveData = async () => {
    //     const jsonDataArray = [];
    
    //     const tablesData = [
    //         { type: 'GOR', data: gorData },
    //         { type: 'SBHP', data: sbhpData },
    //         { type: 'Watercut', data: watercutData },
    //         { type: 'PI', data: piData }
    //     ];
    
    //     tablesData.forEach(table => {
    //         const { type, data } = table;
    //         data.forEach(rowData => {
    //             const jsonData = {
    //                 object_instance: rowData[0],
    //                 date_time: 0,
    //                 value: [
    //                     rowData[2],
    //                     rowData[3],
    //                     rowData[4],
    //                     rowData[5],
    //                     rowData[6],
    //                     rowData[7],
    //                     rowData[8],
    //                     rowData[9]
    //                 ],
    //                 description: rowData[10],
    //                 data_source_id: trendsSetId,
    //                 sub_data_source: type
    //             };
    //             jsonDataArray.push(jsonData);
    //         });
    //     });
    
    //     axios.post('${baseUrl}/api/save_trends/', jsonDataArray)
    //         .then(response => {
    //             console.log('Data saved successfully:', response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error saving data:', error);
    //         });
    // };
    

    const saveData = async () => {
        const jsonDataArray = [];
    
        const tablesData = [
            { type: 'GOR', data: gorData },
            { type: 'SBHP', data: sbhpData },
            { type: 'Watercut', data: watercutData },
            { type: 'PI', data: piData }
        ];
    
        tablesData.forEach(table => {
            const { type, data } = table;
            data.forEach(rowData => {
                let valueArray = [];
                let descriptionIndex = 10; // Индекс элемента description по умолчанию
    
                if (type === 'GOR' || type === 'SBHP') {
                    valueArray = [
                        rowData[2],
                        rowData[3],
                        rowData[4],
                        rowData[5],
                        rowData[6],
                        rowData[7],
                        rowData[8],
                        rowData[9]
                    ];
                    descriptionIndex = 10;
                } else if (type === 'Watercut') {
                    valueArray = [
                        rowData[2],
                        rowData[3],
                        rowData[4],
                        rowData[5],
                        rowData[6],
                    ];
                    descriptionIndex = 7; // Индекс элемента description для типа Watercut
                } else if (type === 'PI') {
                    valueArray = [
                        rowData[2],
                        rowData[3],
                        rowData[4],
                        rowData[5],
                        rowData[6],
                        rowData[7],
                        rowData[8],
                        rowData[9]
                    ];
                    descriptionIndex = 10; // Индекс элемента description для типа PI
                }
    
                const jsonData = {
                    object_instance: rowData[0],
                    date_time: 0,
                    value: valueArray,
                    description: rowData[descriptionIndex], // Используем динамический индекс для description
                    data_source_id: trendsSetId,
                    sub_data_source: type
                };
                jsonDataArray.push(jsonData);
            });
        });
        console.log(jsonDataArray);
        axios.post(`${baseUrl}/api/save_trends/`, jsonDataArray)
            .then(response => {
                console.log('Data saved successfully:', response.data);
            })
            .catch(error => {
                console.error('Error saving data:', error);
            });
    };

    const getSettingsByTableType = (type) => {
        let data, colHeaders, columns;
        if (type === 'GOR') {
            data = gorData;
            colHeaders = ['Well', 'Well Type', 'GOR_Date', 'GOR_Initial', 'GOR_Slope', 'c6_gor','c5_gor','c4_gor','c3_gor','c2_gor', 'Comments'];
            columns = [
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
            ];
        } else if (type === 'SBHP') {
            data = sbhpData;
            colHeaders = ['Well', 'Well Type', 'SBHP_Date', 'SBHP_Initial', 'SBHP_Slope', 'c6_sbhp','c5_sbhp','c4_sbhp','c3_sbhp','c2_sbhp', 'Comments'];
            columns = [
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
            ];
        } else if (type === 'Watercut') {
            data = watercutData;
            colHeaders = ['Well', 'Well Type', 'WCT_Date', 'WCT_Initial', 'WCT_Slope', 'WCT_SI_Criteria','WCT_Delay', 'Comments'];
            columns = [
                { data: 0, type: "text" },
                { data: 1, type: "text" },
                { data: 2, type: "text" },
                { data: 3, type: "numeric" },
                { data: 4, type: "numeric" },
                { data: 5, type: "numeric" },
                { data: 6, type: "text" },
                { data: 7, type: "text" }
            ];
        } else if (type === 'PI') {
            data = piData;
            colHeaders = ['Well', 'Well Type', 'PI_C_Date', 'c6_PI','c5_PI','c4_PI','c3_PI','c2_PI','c1_PI','c0_PI', 'Comments'];
            columns = [
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
            ];
        }

        return {
            data,
            rowHeaders: true,
            colHeaders,
            autoColumnSize: true,
            width: 'auto',
            stretchH:'all',
            columns,
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
                            <Button 
                              variant={currentTableType === 'PI' ? 'primary' : 'secondary'}
                              className="btn-sm" 
                              style={{ width: '200px' }}
                              onClick={() => handleTableTypeChange('PI')}
                              >PI</Button>
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
