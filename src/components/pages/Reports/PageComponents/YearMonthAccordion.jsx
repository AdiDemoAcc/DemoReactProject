import React, { useState } from "react";
import "../../../css/YearMonthAccordion.css";
import { Form } from "react-bootstrap";

const YearMonthAccordion = ({ startYear = 1969 }) => {

  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => currentYear - i
  );

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const [selectedYear, setSelectedYear] = useState("");
  const [selected, setSelected] = useState(null);

  const handleMonthSelect = (year, index) => {
    setSelected({ year, monthIndex: index });
  };

  return (
    <div className="ymAccordionWrapper">
      <Form.Label className="ymLabel">Select Month & Year</Form.Label>

      {/* Year Dropdown */}
      <select
        className="ymYearDropdown"
        value={selectedYear}
        onChange={(e) => {
          setSelectedYear(e.target.value);
          setSelected(null);
        }}
      >
        <option value="">Select Year</option>
        {years.map((yr) => (
          <option key={yr} value={yr}>{yr}</option>
        ))}
      </select>

      {/* Months Box Grid */}
      {selectedYear && (
        <div className="ymMonthContainer">
          {months.map((m, index) => (
            <div
              key={index}
              className={`ymMonthBox ${
                selected?.year == selectedYear && selected?.monthIndex === index
                  ? "ymMonthSelected"
                  : ""
              }`}
              onClick={() => handleMonthSelect(selectedYear, index)}
            >
              {m}
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="ymSelectedText">
          Selected: {selected.year} - {selected.monthIndex}
        </div>
      )}
    </div>
  );
};

export default YearMonthAccordion;
