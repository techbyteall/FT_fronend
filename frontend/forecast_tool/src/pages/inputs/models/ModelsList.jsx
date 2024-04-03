import React, { useState, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

import axios from 'axios';

registerAllModules();

const ModelsList = ({isDataUpdated, setIsDataUpdated}) => {
  const [modelsData, setModelsData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/models_set/');
      setModelsData(response.data.data);
      setIsDataUpdated(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, [isDataUpdated]);
  
  const initialData = Array.isArray(modelsData)
    ? modelsData.map(item => [
        item.models_name,
        item.created_date,
        item.models_location,
        item.description,
      ])
    : [];

  const settings = {
    data: initialData,
    rowHeaders: true,
    colHeaders: ['Name', 'Created Date', 'Models Location', 'Comment'],
    // height: 'auto',
    autoColumnSize: true,
    width: 'auto',
    stretchH:'all',
    columns: [
      { 
        data: 0, 
        type: "text",
        readOnly: true,
        // width: () => document.documentElement.clientWidth * 0.2 
      },
      { 
        data: 1, 
        type: "date",
        allowInvalid: false,
        readOnly: true,
        // width: () => document.documentElement.clientWidth * 0.2 
      },
      { 
        data: 2, 
        type: "text",
        readOnly: true,
        // width: () => document.documentElement.clientWidth * 0.2 
    },
    { 
        data: 3, 
        type: "text",
        readOnly: true,
        // width: () => document.documentElement.clientWidth * 0.2 
    },
    ],
    colWidths: 'auto',
    licenseKey: 'non-commercial-and-evaluation',
    filters: true,
    dropdownMenu: true,
    maxCols: 8,
  };

  return (
    <div className="tabs">
      <div className="hotTableContainer" lg={11}>
        <HotTable settings={settings} />
      </div>
    </div>
  );
};

export default ModelsList;
