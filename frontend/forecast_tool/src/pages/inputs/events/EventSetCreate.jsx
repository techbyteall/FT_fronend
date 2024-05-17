// EventSetCreate.js
import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import axios from 'axios';
import 'handsontable/dist/handsontable.full.min.css';

import CheckBoxGroup from '../../../components/CheckBoxGroup';
import WellRoutingTable from './events_config/WellRoutingTable';

import baseUrl from '../../../links';

registerAllModules();

const EventSetCreate = ({ onClose, eventsSetId, selectEventsSetId }) => {
    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [showSaveNotification, setShowSaveNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationError, setNotificationError] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});

    const [showWellRoutingTable, setShowWellRoutingTable] = useState(false);
    
    const handleShowWellRoutingTable = () => {
        setShowWellRoutingTable(true);
    };
    const handleCloseWellRoutingTable = () => {
        setShowWellRoutingTable(false);
    };

    const categorySubDataSourceMapping = {
        1: 'Unit SD',
        2: 'New Wells',
        3: 'Seasonal Wells',
        4: 'Specific Wells',
        5: 'Wells Constraints',
        6: 'FMAP',
        7: 'Pipe Routing',
        8: 'Well Routing',
        9: 'Hook Up',
        10: 'Process',
        11: 'Export',
        12: 'Conventional Wells',
    };

    useEffect(() => {
        if (selectEventsSetId) {
            axios.get(`${baseUrl}/api/main_class/${selectEventsSetId}`)
                .then(response => {
                    const eventData = response.data.map(item => [
                        item.date_time,
                        item.object_type,
                        item.object_instance,
                        item.object_type_property,
                        item.value,
                        item.sub_data_source,
                    ]);
                    setOriginalData(eventData);
                    setFilteredData(eventData);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [selectEventsSetId]);



        //test
        const handleGetIVMData = () => {
            axios.get('http://localhost:8000/api/get_ivm_data/')
                .then(response => {
                    const newData = response.data.map(item => [
                        item.Date,
                        item.Type,
                        item.Name,
                        item.Action,
                        '', 
                        'Pipe Routing'
                    ]);
                    setOriginalData(prevData => [...prevData, ...newData]);
                    setFilteredData(prevData => [...prevData, ...newData]);
                })
                .catch(error => {
                    console.error('Error fetching data from IVM:', error);
                });
        };
        const handleGetIVMFMAP = () => {
            axios.get('http://localhost:8000/api/get_ivm_fmap/')
                .then(response => {
                    const newData = response.data.map(item => [
                        item.Date,//LastGoodSampleTime,
                        item.Type,//ObjectTypeName,
                        item.Name,//ObjectInstanceName,
                        item.Action,//ObjectTypePropertyName,
                        item.Value,//CurrentValue, 
                        'FMAP'
                    ]);
                    setOriginalData(prevData => [...prevData, ...newData]);
                    setFilteredData(prevData => [...prevData, ...newData]);
                })
                .catch(error => {
                    console.error('Error fetching data from IVM:', error);
                });
        };

        //test
    const addEmptyRow = () => {
        const activeCheckboxes = Object.entries(checkedItems)
            .filter(([index, isChecked]) => isChecked)
            .map(([index]) => index);
        const newEmptyRow = ['', '', '', '', '', ''];
        if (activeCheckboxes.length === 1) {
            const categoryValue = categorySubDataSourceMapping[activeCheckboxes[0]];
            newEmptyRow[5] = categoryValue;
        }
        setOriginalData(prevData => [...prevData, newEmptyRow]);
        setFilteredData(prevData => [...prevData, newEmptyRow]);
    };
    
    const removeEmptyRows = () => {
        const newFilteredData = filteredData.filter(row => row.some(cell => cell !== undefined && cell !== null && cell !== ''));
        setFilteredData(newFilteredData);
        setOriginalData(newFilteredData);
    };

    const handleClose = () => {
        onClose();
    };

    const saveData = async () => {
        const jsonDataArray = [];
        filteredData.forEach(rowData => {
            const jsonData = {
                date_time: rowData[0],
                object_type: rowData[1],
                object_instance: rowData[2],
                object_type_property: rowData[3],
                value: rowData[4],
                sub_data_source: rowData[5],
                data_source_id: eventsSetId,
                
            };
            jsonDataArray.push(jsonData);
        });

        axios.post(`${baseUrl}/api/save_events/`, jsonDataArray)
            .then(response => {
                console.log('Data saved successfully:', response.data);
                setShowSaveNotification(true);
                setNotificationError(false);
                setNotificationMessage('Data saved successfully');
                setTimeout(() => {
                    setShowSaveNotification(false);
                }, 10000);
            })
            .catch(error => {
                console.error('Error saving data:', error.response.data);
                setShowSaveNotification(true);
                setNotificationError(true);
                setNotificationMessage('Error saving data');
                setTimeout(() => {
                    setShowSaveNotification(false);
                }, 10000);
            });
    };

    const handleNotificationClose = () => {
        setShowSaveNotification(false);
    };
    const notificationClassName = `notification ${notificationError ? 'error' : 'success'}`;
    

    const settings = {
        data: filteredData,
        rowHeaders: true,
        colHeaders: ['Date', 'Type', 'Name', 'Action', 'Value', 'Category'],
        autoColumnSize: true,
        width: 'auto',
        stretchH: 'all',
        height: 500,
        columns: [
            {
                data: 0,
                type: 'date',
                allowInvalid: false,
                allowEmpty: true,
                dateFormat: 'DD/MM/YYYY',
            },
            {
                data: 1,
                type: 'text',
            },
            {
                data: 2,
                type: 'text',
            },
            {
                data: 3,
                type: 'text',
            },
            {
                data: 4,
                type: 'numeric',
            },
            {
                data: 5,
                type: 'text',
                allowInvalid: false,
            },
        ],
        colWidths: 'auto',
        licenseKey: 'non-commercial-and-evaluation',
        dropdownMenu: true,
        maxCols: 6,
        multiColumnSorting: true,
        filters: true,
    };

    return (
        <div className='event-set-create'>
            <Row>
                <Col>
                    <div style={{ textAlign: 'center', fontSize: '28px' }}>Create Event Set</div>
                </Col>
                <Col>
                    <div className='d-flex justify-content-end'>
                        <Button variant='secondary' className='btn-sm' onClick={handleClose} style={{ marginRight: '15px' }}>Close</Button>
                        <Button variant='secondary' className='btn-sm' onClick={addEmptyRow} style={{ marginRight: '15px' }}>Add Empty Row</Button>
                        <Button variant='secondary' className='btn-sm' onClick={removeEmptyRows} style={{ marginRight: '15px' }}>Remove Empty Rows</Button>
                        <Button variant='primary' className='btn-sm' onClick={saveData} style={{ marginRight: '15px' }}>Save</Button>
                    </div>
                </Col>
                {showSaveNotification && (
                    <div className={notificationClassName} onClick={handleNotificationClose}>
                        {notificationMessage}
                    </div>
                )}
            </Row>
            <div>
                <Row>
                    <Col className='mt-3' lg={2}>
                        <CheckBoxGroup
                            categorySubDataSourceMapping={categorySubDataSourceMapping}
                            filteredData={filteredData}
                            setFilteredData={setFilteredData}
                            originalData={originalData}
                            checkedItems={checkedItems}
                            setCheckedItems={setCheckedItems} />
                        <Button variant='primary' 
                                className='btn-sm' 
                                style={{ marginTop: '15px', marginLeft: '50px', display: checkedItems[8] ? 'block' : 'none' }} 
                                onClick={handleShowWellRoutingTable}>Well Routing</Button>
                        <WellRoutingTable show={showWellRoutingTable} handleClose={handleCloseWellRoutingTable} /> 

                        {/* test */}
                        <Button variant='primary' 
                                className='btn-sm' 
                                style={{ marginTop: '15px', marginLeft: '50px', display: checkedItems[7] ? 'block' : 'none' }} 
                                onClick={handleGetIVMData}>Get PR from IVM</Button>
                         
                        <Button variant='primary' 
                                className='btn-sm' 
                                style={{ marginTop: '15px', marginLeft: '50px', display: checkedItems[6] ? 'block' : 'none' }} 
                                onClick={handleGetIVMFMAP}>Get FMAP from IVM</Button>
                        {/* test */}
                    </Col>
                    <Col className='mt-3' lg={10}>
                        <HotTable settings={settings} />
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default EventSetCreate;
