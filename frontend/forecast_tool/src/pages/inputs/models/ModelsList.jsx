import React, { useState, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

import axios from 'axios';

registerAllModules();

const ModelsList = () => {
  const [modelsData, setModelsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/models_set/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setModelsData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
//   useEffect(() => {
//     axios
//         .get('http://localhost:8000/api/models_set/')
//         .then(res=> {
//             console.log(res);
//             setConsolidatedData(res.data);
//         })
//         .catch(err=> {
//             console.log(err);
//             setConsolidatedData([]);
//         })
// }, []);


  // Преобразуйте consolidatedData в формат, который ожидается в initialData
  const initialData = Array.isArray(modelsData) ? modelsData.map(item => [ //= setConsolidatedData.map(item => [
    item.models_name,
    item.created_date,
    item.models_location,
    item.description,
  ]) : [];

  const settings = {
    data: initialData,
    rowHeaders: true,
    colHeaders: ['Name', 'created date', 'models location', 'description'],
    height: 'auto',
    width: '1250',
    columns: [
      { data: 0, type: "text", readOnly: true },
      { data: 1, type: "date", allowInvalid: false },
      { data: 2, type: "text", readOnly: true },
      { data: 3, type: "text", readOnly: true },
    ],
    colWidths: [150, 150, 150, 150],
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

export default ModelsList;

