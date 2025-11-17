import React, { useState, useRef, useEffect } from "react";
import "../../../css/YearMonthAccordion.css";

const YearMonthAccordion = ({ startYear = 1969, onChange }) => {
  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => currentYear - i
  );

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const [open, setOpen] = useState(false);
  const [expandedYear, setExpandedYear] = useState(null);
  const [selected, setSelected] = useState({ year: "", monthIndex : null });

  const wrapperRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setOpen(false);
      setExpandedYear(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleYearClick = (year) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  const handleMonthSelect = (year, monthIndex) => {
    setSelected({ year, monthIndex });
    if (onChange) {
      onChange(year,monthIndex);
    }
    setOpen(false);
    setExpandedYear(null);
  };

  return (
    <div className="ymInputWrapper" ref={wrapperRef}>
      {/* SINGLE INPUT FIELD */}
      <div
        className="ymInputBox"
        onClick={() => setOpen(!open)}
      >
        {selected.year != '' && selected.monthIndex != null
          ? `${selected.year} - ${months[selected.monthIndex]}`
          : "Select Month & Year"}
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="ymDropdown">
          {years.map((yr) => (
            <div key={yr} className="ymYearSection">
              {/* YEAR ROW */}
              <div
                className="ymYearRow"
                onClick={() => handleYearClick(yr)}
              >
                {yr}
                <span className="ymArrow">
                  {expandedYear === yr ? "▲" : "▼"}
                </span>
              </div>

              {/* MONTHS UNDER EXPANDED YEAR */}
              {expandedYear === yr && (
                <div className="ymMonthContainer">
                  {months.map((m,index) => (
                    <div
                      key={index}
                      className={`ymMonthBox ${
                        selected.year === yr && selected.monthIndex === index
                          ? "ymMonthSelected"
                          : ""
                      }`}
                      onClick={() => handleMonthSelect(yr, index)}
                    >
                      {m}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YearMonthAccordion;
