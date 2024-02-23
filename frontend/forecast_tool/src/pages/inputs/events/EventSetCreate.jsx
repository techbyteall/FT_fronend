import React, { useState } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

registerAllModules();

const EventSetCreate = ({ onClose }) => {
  const initialData = [
    ['', '', '', '', '', '']
  ];

  const [data, setData] = useState(initialData);

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
    onClose(); // Вызываем функцию onClose из пропсов
  };

  const saveData = () => {
   
  };

  return (
    <div className='event-set-create'>
      <h2>Create Event Set</h2>
      <div className='hotTableContainer'>
        <HotTable
          settings={{
            data,
            rowHeaders: true,
            colHeaders: ['Date', 'Type', 'System', 'Name', 'Action', 'Value'],
            height: 'auto',
            width: '950',
            columns: [
              { data: 1, type: "date", allowInvalid: false },
              { data: 2, type: "text" },
              { data: 3, type: "text" },
              { data: 4, type: "text"},
              { data: 5, type: "text" },
              { data: 6, type: "numeric"}
            ],
            colWidths: [150, 150, 150, 150, 150, 150],
            licenseKey: 'non-commercial-and-evaluation',
            filters: true,
            dropdownMenu: true,
            maxCols: 6,
          }}
        />
        <div className='buttons-container'>
          <button onClick={addEmptyRow}>Add Empty Row</button>
          <button onClick={removeEmptyRows}>Remove Empty Rows</button>
          <button onClick={saveData}>Save</button>
          <button variant="secondary" onClick={handleClose}>Close</button> {/* Кнопка для закрытия */}
        </div>
      </div>
    </div>
  );
};

export default EventSetCreate;
