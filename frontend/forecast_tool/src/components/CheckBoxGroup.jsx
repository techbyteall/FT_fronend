import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

function CheckBoxGroup({ categorySubDataSourceMapping, filteredData, setFilteredData, originalData, checkedItems, setCheckedItems }) {
    
    useEffect(() => {
        const initialCheckedItems = Object.fromEntries(Object.keys(categorySubDataSourceMapping).map(index => [index, false]));
        setCheckedItems(initialCheckedItems);
    }, []);

    const handleCheckboxChange = (index) => {
        const newCheckedItems = { ...checkedItems, [index]: !checkedItems[index] };
        setCheckedItems(newCheckedItems);
        filterDataByCheckedItems(newCheckedItems);
    };
    

    const filterDataByCheckedItems = (checkedItems) => {
        if (Object.values(checkedItems).every(value => value === false)) {
            setFilteredData(originalData);
        } else {
            const newData = originalData.filter(row => {
                const categoryIndex = Object.keys(categorySubDataSourceMapping).find(key => categorySubDataSourceMapping[key] === row[5]);
                return checkedItems[categoryIndex];
            });
            setFilteredData(newData);
        }
    };

    useEffect(() => {
        filterDataByCheckedItems(checkedItems);
    }, [checkedItems]);


    return (
        <div style={{ width: '200px', border: '1px solid #ccc', padding: '10px', backgroundColor: 'white' }}>
            
            {Object.entries(categorySubDataSourceMapping).map(([index, label]) => (
                <Row key={index}>
                    <Col>
                        <input
                            type='checkbox'
                            onChange={() => handleCheckboxChange(index)}
                            checked={checkedItems[index]}
                            style={{ marginRight: '10px' }}
                        />
                        <label>{label}</label>
                    </Col>
                </Row>
            ))}
        </div>
    );
}

export default CheckBoxGroup;