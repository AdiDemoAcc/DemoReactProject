import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

const MonthSelector = ({ startYear = 1969 }) => {

  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => currentYear - i
  );

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  return (
    <>
      <Col>
        <Form.Label>Select Year</Form.Label>
        <Form.Select
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
            setSelectedMonth(""); // reset month on year change
          }}
        >
          <option value="">Select Year</option>
          {years.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </Form.Select>
      </Col>

      <Col>
        <Form.Label>Select Month</Form.Label>
        <Form.Select
          value={selectedMonth}
          disabled={!selectedYear}  // disabled if year not selected
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">Select Month</option>
          {months.map((m, index) => (
            <option key={index} value={index}>
              {m}
            </option>
          ))}
        </Form.Select>
      </Col>
    </>
  );
};

export default MonthSelector;
