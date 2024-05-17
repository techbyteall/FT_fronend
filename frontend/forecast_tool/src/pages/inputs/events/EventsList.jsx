import React, { useState, useEffect } from 'react';
import 'handsontable/dist/handsontable.full.min.css';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import axios from 'axios';
import './eventsCss.css';

import baseUrl from '../../../links';

registerAllModules();

export const EventsList = () => {
    const [showEventSet, setShowEventSet] = useState([]);
    const [events, setEvents] = useState([]); //new

    const fetchData = async () => {
      try {
          const response = await fetch(`${baseUrl}/api/events_set_list/`);
          if (!response.ok) {
              throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setShowEventSet(data.data);
          setEvents(data.data);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };

  useEffect(() => {
      fetchData();
  }, []);

    const handleDeleteEvent = async (eventId) => {
      try {
        const response = await axios.delete(`${baseUrl}/api/delete_event/${eventId}`);
          if (response.status === 204) {
            fetchData();
          }else {
            throw new Error('Failed to delete event');
          }
        }catch (error) {
          console.error('Error deleting event:', error);
        }
    };
    
    const initialData = Array.isArray(showEventSet) ? showEventSet.map(item => [
        item.events_set_id,
        item.events_set_name,
        item.created_date,
        item.description     
    ]) : [];

    const settings = {
      data: initialData,
      rowHeaders: true,
      autoColumnSize: true,
      height: 580,
      
      width: 'auto',
      stretchH:'all',
      colHeaders: [ "EventsSet ID", "EventsSet name", "Created Date", "Comments",'Actions'],
      columns: [
        { 
          data: 0, 
          type: "text",
          readOnly: true,
        },
        { 
          data: 1, 
          type: "text",
          readOnly: true,
        },
        { 
          data: 2, 
          type: "date",
          allowInvalid: false,
          readOnly: true,
      },
      { 
          data: 3, 
          type: "text",
          readOnly: true,
      },      
      {
        data: 4,
        renderer: buttonRenderer, 
        readOnly: true,
    }
      ],
      colWidths: 'auto',
      licenseKey: "non-commercial-and-evaluation",
      dropdownMenu: true,
      filters: true,
      macCols: 5,
      
  };
  
function buttonRenderer(instance, td, row, col, prop, value, cellProperties) {
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('buttonContainer');
  const editButton = document.createElement('button');
  editButton.classList.add('editButton');
  editButton.textContent = 'Edit';
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('deleteButton');
  deleteButton.textContent = 'Delete';
  
  editButton.addEventListener('click', function() {
      
  });
  deleteButton.addEventListener('click', function() {
      const confirmed = window.confirm('Are you sure you want to delete this event?');
      if (confirmed) {
          handleDeleteEvent(showEventSet[row].events_set_id);
      }
  });
  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);
  
  td.textContent = '';
  td.appendChild(buttonContainer);

  return td;
}
    return (
        <div className='tabs'>
          <div className='hotTableContainer' lg={12}>
            <HotTable settings={settings} />
          </div>
        </div>
    );
};

export default EventsList;
