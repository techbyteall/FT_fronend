import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

function CheckBoxGroupTR() {
  const [checkedIndices, setCheckedIndices] = useState([0]); // Начально нет активных чекбоксов

  const handleCheckboxChange = (index) => {
    // Если активирован только один чекбокс и он пытается быть деактивированным, игнорируем его
    if (checkedIndices.length === 1 && checkedIndices.includes(index)) {
      return;
    }

    // Если чекбокс с индексом index уже активирован, деактивируем его
    if (checkedIndices.includes(index)) {
      setCheckedIndices(checkedIndices.filter((idx) => idx !== index));
    } else {
      // В противном случае активируем чекбокс
      setCheckedIndices([...checkedIndices, index]);
    }
 
  };

  return (
    <div style={{ width: "200px", border: "1px solid #ccc", padding: "10px", backgroundColor: "white"  }}>
      <Row>
        <Col>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(0)}
            checked={checkedIndices.includes(0)}
            style={{ marginRight: '10px'}}
          />
          <label>All</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(1)}
            checked={checkedIndices.includes(1)}
            style={{ marginRight: '10px'}}
          />
          <label>New wells</label>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(2)}
            checked={checkedIndices.includes(2)}
            style={{ marginRight: '10px'}}
          />
          <label>WBU</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(3)}
            checked={checkedIndices.includes(3)}
            style={{ marginRight: '10px'}}
          />
          <label>Central</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(4)}
            checked={checkedIndices.includes(4)}
            style={{ marginRight: '10px'}}
          />
          <label>North</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(5)}
            checked={checkedIndices.includes(5)}
            style={{ marginRight: '10px'}}
          />
          <label>South</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(6)}
            checked={checkedIndices.includes(6)}
            style={{ marginRight: '10px'}}
          />
          <label>Special</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(7)}
            checked={checkedIndices.includes(7)}
            style={{ marginRight: '10px'}}
          />
          <label>Wet wells</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(8)}
            checked={checkedIndices.includes(8)}
            style={{ marginRight: '10px'}}
          />
          <label>Gas breakthrough</label>
        </Col>
      </Row>
      
    </div>
  );
}

export default CheckBoxGroupTR;
