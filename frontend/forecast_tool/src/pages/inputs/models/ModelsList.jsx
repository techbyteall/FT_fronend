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
    fetchData(); // Вызываем fetchData при монтировании компонента
  }, [isDataUpdated]);
  // useEffect(() => {
  //   fetchData(); // Вызываем fetchData при монтировании компонента

  //   // Затем создаем интервал, чтобы обновлять данные каждые, например, 5 секунд
  //   const intervalId = setInterval(fetchData, 5000);

  //   // Возвращаем функцию для очистки интервала при размонтировании компонента
  //   return () => clearInterval(intervalId);
  // }, []); // Пустой массив означает, что useEffect вызывается только при монтировании и размонтировании

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
    colHeaders: ['Name', 'created date', 'models location', 'description'],
    // height: 'auto',
    autoColumnSize: true,
    width: 'auto',
    columns: [
      { 
        data: 0, 
        type: "text",
        readOnly: true,
        width: () => document.documentElement.clientWidth * 0.2 // Вычисление ширины колонки как 15% ширины экрана
      },
      { 
        data: 1, 
        type: "date",
        allowInvalid: false,
        readOnly: true,
        width: () => document.documentElement.clientWidth * 0.2 // Вычисление ширины колонки как 15% ширины экрана
      },
      { 
        data: 2, 
        type: "text",
        readOnly: true,
        width: () => document.documentElement.clientWidth * 0.2 // Вычисление ширины колонки как 15% ширины экрана
    },
    { 
        data: 3, 
        type: "text",
        readOnly: true,
        width: () => document.documentElement.clientWidth * 0.2 // Вычисление ширины колонки как 15% ширины экрана
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
      <div className="hotTableContainer">
        <HotTable settings={settings} />
      </div>
    </div>
  );
};

export default ModelsList;
