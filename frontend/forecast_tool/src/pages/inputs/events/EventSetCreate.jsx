import React, { useState } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { Container, Row, Col, Button } from "react-bootstrap";
import CheckBoxGroup  from '../../../components/CheckBoxGroup';
import axios from 'axios';
import '../../../index.css'
// import '..event.css'

registerAllModules();

const EventSetCreate = ({ onClose, eventsSetId }) => {
    
    const initialData = [
        ['', '', '', '', '','']
    ];

    const [data, setData] = useState(initialData);
    const [showSaveNotification, setShowSaveNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationError, setNotificationError] = useState(false);

    // const showNotification = (message) => {
    //     setNotificationMessage(message);
    //     setShowSaveNotification(true);
    // };
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
            // console.log('Data saved successfully:', jsonDataArray);
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


    const settings={
        data,
        rowHeaders: true,
        colHeaders: ['Date', 'Type', 'Name', 'Action', 'Value','Category'],
        // height: 'auto',
        autoColumnSize: true,
        width: 'auto',
        columns: [
            { 
                data: 0, 
                type: "date",
                allowInvalid: false,
                width: () => document.documentElement.clientWidth * 0.1 // Вычисление ширины колонки как 15% ширины экрана
              },
            { 
                data: 1, 
                type: "text",
                width: () => document.documentElement.clientWidth * 0.13 // Вычисление ширины колонки как 15% ширины экрана
            },
            { 
                data: 2, 
                type: "text",
                width: () => document.documentElement.clientWidth * 0.13 // Вычисление ширины колонки как 15% ширины экрана
            },
            { 
                data: 3, 
                type: "text",
                width: () => document.documentElement.clientWidth * 0.1 // Вычисление ширины колонки как 15% ширины экрана
            },
            { 
                data: 4, 
                type: "numeric",
                width: () => document.documentElement.clientWidth * 0.1 // Вычисление ширины колонки как 15% ширины экрана
            },
            { 
                data: 5, 
                type: "text",
                width: () => document.documentElement.clientWidth * 0.19 // Вычисление ширины колонки как 25% ширины экрана
            }
        ],
        colWidths: 'auto',
        licenseKey: 'non-commercial-and-evaluation',
        filters: true,
        dropdownMenu: true,
        maxCols: 6,
    };

    return (
        <div className='event-set-create'>
            <Row>
                <Col>
                <div style={{ textAlign: 'center', fontSize: '28px' }}>Create Event Set</div>
                </Col>      
                <Col>
                    <div className="d-flex justify-content-end">  
                        <Button variant="secondary" className="btn-sm" onClick={handleClose} style={{ marginRight: '15px'}}>Close</Button> 
                        <Button variant="secondary" className="btn-sm" onClick={addEmptyRow} style={{ marginRight: '15px'}}>Add Empty Row</Button>
                        <Button variant="secondary" className="btn-sm" onClick={removeEmptyRows} style={{ marginRight: '15px'}}>Remove Empty Rows</Button>
                        <Button variant="primary" className="btn-sm" onClick={saveData} style={{ marginRight: '15px'}}>Save</Button>
                               
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
