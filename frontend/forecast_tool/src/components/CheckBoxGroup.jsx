import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

function CheckBoxGroup() {
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
    <div style={{ border: "1px solid #ccc", padding: "10px", backgroundColor: "white"  }}>
      <Row>
        <Col>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(0)}
            checked={checkedIndices.includes(0)}
          />
          <label>Conventional Wells</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(1)}
            checked={checkedIndices.includes(1)}
          />
          <label>Unit SD</label>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(2)}
            checked={checkedIndices.includes(2)}
          />
          <label>New Wells</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(3)}
            checked={checkedIndices.includes(3)}
          />
          <label>Seasonal Wells</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(4)}
            checked={checkedIndices.includes(4)}
          />
          <label>Specific Wells</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(5)}
            checked={checkedIndices.includes(5)}
          />
          <label>Wells Constraints</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(6)}
            checked={checkedIndices.includes(6)}
          />
          <label>FMAP</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(7)}
            checked={checkedIndices.includes(7)}
          />
          <label>Pipe Routing</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(8)}
            checked={checkedIndices.includes(8)}
          />
          <label>Well Routing</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(9)}
            checked={checkedIndices.includes(9)}
          />
          <label>Hook Up</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(10)}
            checked={checkedIndices.includes(10)}
          />
          <label>Process</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(11)}
            checked={checkedIndices.includes(11)}
          />
          <label>Export</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(12)}
            checked={checkedIndices.includes(12)}
          />
          <label>Consolidated Sheet</label>
        </Col>
      </Row>
    </div>
  );
}

export default CheckBoxGroup;
