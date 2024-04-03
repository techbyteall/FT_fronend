import { Button, Row, Col  } from "react-bootstrap";
import React from "react";
import { useState, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import AddServerModal from './servers/AddServerModal'

registerAllModules();


export const Servers = () => { 
    const [serverData, setServerData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/servers_list/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setServerData(data.data);
        } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

        fetchData();
    }, []);

    const initialData = Array.isArray(serverData) ? serverData.map(item => [ 
        item.server_name,
        item.server_url ,
        item.server_status,
        item.description,
        ]) : [];

        const settings = {
            data: initialData,
            rowHeaders: true,
            colHeaders: ['Server Name', 'URL', 'Status', 'Comments'],
            // height: 'auto',
            autoColumnSize: true,
            width: 'auto',
            stretchH:'all',
            columns: [
                { 
                    data: 0, 
                    type: "text",
                    readOnly: true,
                    // width: () => document.documentElement.clientWidth * 0.2 // Вычисление ширины колонки как 15% ширины экрана
                  },
                  { 
                    data: 1, 
                    type: "text",
                    readOnly: true,
                    // width: () => document.documentElement.clientWidth * 0.2 // Вычисление ширины колонки как 15% ширины экрана
                  },
                  { 
                    data: 2, 
                    type: "text",
                    readOnly: true,
                    // width: () => document.documentElement.clientWidth * 0.2 // Вычисление ширины колонки как 15% ширины экрана
                },
                { 
                    data: 3, 
                    type: "text",
                    readOnly: true,
                    // width: () => document.documentElement.clientWidth * 0.2 // Вычисление ширины колонки как 15% ширины экрана
                },
            ],
            colWidths: 'auto',
            licenseKey: 'non-commercial-and-evaluation',
            filters: true,
            dropdownMenu: true,
          };
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <Row className="mt-3">
                <Col>
                    <Button variant="primary" className="btn-sm" onClick={handleOpenModal} style={{marginLeft: 20}}>Register Server</Button>{' '}
                    <AddServerModal show={showModal} handleClose={handleCloseModal} /> 
                    <AddServerModal />
                </Col>
            </Row>
            <Row className="mt-3 ml-3">
                <Col md={12} >
                    <div className='hotTableContainer' tg={10}>
                        <HotTable  settings={settings} />
                    </div>
                </Col>
            </Row>
        </div>
    )
}
