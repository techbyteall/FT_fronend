import React, { useState, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

import axios from 'axios';

registerAllModules();

const StatusList = () => {
  const [statusScData, setStatusScData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/sc_status_list/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setStatusScData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const initialData = Array.isArray(statusScData) ? statusScData.map(item => [ 
    item.scenario_name,
    item.created_date,
    item.models_id,
    item.events_set_id,
    item.trends_set_id,
    item.description,
  ]) : [];

  const settings = {
    data: initialData,
    rowHeaders: true,
    colHeaders: ['Scenario Name', 'Created Date', 'Models', 'Events', 'Trends', 'description'],
    height: 'auto',
    width: 'auto',
    columns: [
      { data: 0, type: "text", readOnly: true },
      { data: 1, type: "date", allowInvalid: false },
      { data: 2, type: "text", readOnly: true },
      { data: 3, type: "text", readOnly: true },
      { data: 4, type: "text", readOnly: true },
      { data: 5, type: "text", readOnly: true },
    ],
    colWidths: [150, 250, 250, 150, 250, 250],
    licenseKey: 'non-commercial-and-evaluation',
    filters: true,
    dropdownMenu: true,
    maxCols: 8,
  };

  return (
    <div className='tabs'>
      <div className='hotTableContainer'>
        <HotTable settings={settings} />
      </div>
    </div>
  );
};

export default StatusList;

