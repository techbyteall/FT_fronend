import React, { useState, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import baseUrl from '../../links';

import axios from 'axios';

registerAllModules();

const StatusList = ({isDataUpdated, setIsDataUpdated }) => {
  const [statusScData, setStatusScData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/sc_status_list/`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setStatusScData(data.data);
        setIsDataUpdated(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isDataUpdated]);

  const initialData = Array.isArray(statusScData) ? statusScData.map(item => [ 
    item.scenario_name,
    item.created_date,
    item.status,
    item.server,
    item.description,
  ]) : [];

  const settings = {
    data: initialData,
    rowHeaders: true,
    colHeaders: ['Scenario Name', 'Created Date', 'Status', 'Server', 'Comments'],
    // height: 'auto',
    autoColumnSize: true,
    width: 'auto',
    stretchH:'all',
    columns: [
      { 
        data: 0, 
        type: "text",
        readOnly: true,
        // width: () => document.documentElement.clientWidth * 0.15 
      },
      { 
        data: 1, 
        type: "date",
        readOnly: true,
        allowInvalid: false,
        // width: () => document.documentElement.clientWidth * 0.15 
      },
      { 
        data: 2, 
        type: "text",
        readOnly: true,
        // width: () => document.documentElement.clientWidth * 0.15,
        renderer: (instance, td, row, col, prop, value, cellProperties) => {
          // Проверяем, определено ли значение и если значение равно "running"
          if (value && value.trim() === 'running') {
            td.style.color = '#00FF00'; 
          }
          td.textContent = value; // устанавливаем значение ячейки
        }
      },
      { 
        data: 3, 
        type: "text",
        readOnly: true,
        // width: () => document.documentElement.clientWidth * 0.15 
      },
      { 
        data: 4,
        type: "text",
        readOnly: true, 
        // width: () => document.documentElement.clientWidth * 0.15 
      }
    ],
    colWidths: 'auto',
    licenseKey: 'non-commercial-and-evaluation',
    filters: true,
    dropdownMenu: true,
    maxCols: 8,
  };

  return (
    <div className='tabs'>
      <div className='hotTableContainer' lg={10}>
        <HotTable settings={settings} />
      </div>
    </div>
  );
};

export default StatusList;

