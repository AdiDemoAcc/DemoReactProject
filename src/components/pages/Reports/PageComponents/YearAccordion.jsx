import React from 'react'
import { Form } from 'react-bootstrap';

const YearAccordion = ({ startYear = 1969, onChange, selectedYear }) => {

    const [isOpen, setIsOpen] = React.useState(false);

    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= startYear; year--) {
        years.push(year);
    }

    const handleYearSelect = (year) => {
        if (onChange) {
            onChange(year);
        }   
        setIsOpen(false);
    }

    return (
        // <div style={{position: 'relative' ,width: '300px'}}>
        //     <button onClick={() => setIsOpen(!isOpen)}
        //         style={{width: '100%', textAlign: 'left', padding: '5px'}}
        //     >
        //         {selectedYear ? `Year: ${selectedYear}` : 'Select Year'}
        //         <span style={{float: 'right'}}>{isOpen ? '▲' : '▼'}</span>
        //     </button>
        //     {isOpen && (
        //         <div style={{
        //             position: 'absolute', 
        //             top: '100%', 
        //             left: 0, 
        //             right: 0,
        //             zIndex: 1000, 
        //             backgroundColor: 'white', 
        //             border: '1px solid #ccc', 
        //             padding: '5px',
        //             overflowY: 'auto',
        //             maxHeight: '200px'
        //         }}>
        //             {years.map(year => (
        //                 <div 
        //                     key={year} 
        //                     onClick={() => handleYearSelect(year)} 
        //                     style={{
        //                         display: 'block', 
        //                         width: '100%', 
        //                         textAlign: 'left',
        //                         borderBottom: '1px solid #eee',
        //                         backgroundColor: selectedYear === year ? '#f0f0f0' : 'transparent',
        //                     }}>
        //                     {year}
        //                 </div>
        //             ))}
        //         </div>
        //     )}
        // </div>
        <Form.Control 
            as="select" 
            value={selectedYear || ''}
            onChange={(e) => handleYearSelect(parseInt(e.target.value))}
            style={{
                maxHeight: '300px',
                overflowY: 'auto'
            }}
            >
                {years.map(year => (
                    <option 
                        key={year}
                        value={year}
                    >
                        {year}
                    </option>
                ))}
            </Form.Control>
    )
}

export default YearAccordion