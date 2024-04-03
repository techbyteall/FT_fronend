// EventSetCreate.js
import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import axios from 'axios';
import 'handsontable/dist/handsontable.full.min.css';

import CheckBoxGroup from '../../../components/CheckBoxGroup';

registerAllModules();

const EventSetCreate = ({ onClose, eventsSetId, selectEventsSetId }) => {
    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [showSaveNotification, setShowSaveNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationError, setNotificationError] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});

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
            axios.get(`http://localhost:8000/api/main_class/${selectEventsSetId}`)
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

    // const addEmptyRow = () => {
    //     const newEmptyRow = ['', '', '', '', '', ''];
    
    //     const activeCheckboxes = Object.entries(checkedItems)
    //         .filter(([index, isChecked]) => isChecked)
    //         .map(([index]) => index);
    
    //     // Добавляем новую строку
    //     setOriginalData(prevData => [...prevData, newEmptyRow]);
    //     setFilteredData(prevData => [...prevData, newEmptyRow]);
    
    //     // Проверяем, что активен только один чекбокс
    //     if (activeCheckboxes.length === 1) {
    //         const categoryValue = categorySubDataSourceMapping[activeCheckboxes[0]];
    //         newEmptyRow[5] = categoryValue;
    //         // Обновляем столбец Category
    //         setOriginalData(prevData => [...prevData, newEmptyRow]);
    //         setFilteredData(prevData => [...prevData, newEmptyRow]);
    //     }
    // };
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

        axios.post('http://localhost:8000/api/save_events/', jsonDataArray)
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
