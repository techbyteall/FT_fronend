import React, { useState, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';


registerAllModules();

export const TrendsList = () => {
  const [trendsData, setTrendsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/trends_set_list/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setTrendsData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const initialData = Array.isArray(trendsData) ? trendsData.map(item => [
    item.trends_set_name,
    item.created_date,
    item.description,
  ]) : [];

  const settings = {
    data: initialData,
    rowHeaders: true,
    colHeaders: ['TrendsSet Name', 'Created Date',  'Comments'],
    // height: 'auto',
    autoColumnSize: true,
    width: 'auto',
    stretchH:'all',
    columns: [
      //{ data: 0, type: "text", readOnly: true },
      { 
        data: 0, 
        type: "text",
        readOnly: true,
        // width: () => document.documentElement.clientWidth * 0.3 // Вычисление ширины колонки как 15% ширины экрана
      },
      { 
        data: 1, 
        type: "date",
        allowInvalid: false,
        readOnly: true,
        // width: () => document.documentElement.clientWidth * 0.3 // Вычисление ширины колонки как 15% ширины экрана
      },
      { 
        data: 2, 
        type: "text",
        readOnly: true,
        // width: () => document.documentElement.clientWidth * 0.3 // Вычисление ширины колонки как 15% ширины экрана
    },
    ],
    colWidths: 'auto',
    licenseKey: 'non-commercial-and-evaluation',
    filters: true,
    dropdownMenu: true,
    //maxCols: 8,
  };

  return (
    <div className='tabs'>
      <div className='hotTableContainer' lg={12}>
        <HotTable settings={settings} />
      </div>
    </div>
  );
};

export default TrendsList;

