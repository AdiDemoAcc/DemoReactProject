import React, { useEffect } from 'react'
import { use } from 'react';
import { Card, Col, Form, Row, Table } from 'react-bootstrap'
import YearMonthAccordion from '../PageComponents/YearMonthAccordion';
import ResidentService from '../../../service/ResidentService';
import YearAccordion from '../PageComponents/YearAccordion';
import ReportService from '../../../service/ReportService';
import { ArrowDownSquareFill } from 'react-bootstrap-icons';
import { useReactToPrint } from 'react-to-print';

const YearlyReports = () => {

    const defaultYear = new Date().getFullYear() - 1;

    const [aptmntData, setAptmntData] = React.useState([]);
    const [bldngData, setBldngData] = React.useState([]);

    const [selectedBuilding, setSelectedBuilding] = React.useState("");
    const [filteredApartments, setFilteredApartments] = React.useState([]);
    const [reportData, setReportData] = React.useState({
        aptmntId: '',
        year: defaultYear,
        buildingId: '',
        txnCategory: ''
    })

    const [transactionList, setTransactionList] = React.useState([]);
    const [selectedYear, setSelectedYear] = React.useState(defaultYear);

    const handleGenerateReport = async (e) => {
        e.preventDefault();
        console.log("Generating report with data: ", reportData);

        const responseObject = await ReportService.generateYearlyReportList(reportData);
        // console.log("Yearly Report Response: ", responseObject);

        responseObject.errorCd === "REQUEST_SUCCESS" && responseObject.respObject && setTransactionList(responseObject.respObject || []);

    }

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            ResidentService.getBuildingAndApartmentData()
                .then(response => {
                    // console.log("API Response : ", response);
                    if (response && response.respObject) {
                        setAptmntData(response.respObject.aptmntList);
                        setBldngData(response.respObject.bldngList);
                    }
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [])

    const reportRef = React.useRef(null);

    const handleBuildingChange = (e) => {
        const bldngId = e.target.value;
        setSelectedBuilding(bldngId);
        setReportData((prevData) => ({
            ...prevData,
            buildingId: bldngId
        }));
        if (bldngId) {
            const filterAptmntts = aptmntData.filter(
                (apt) => apt.bldngId === parseInt(bldngId)
            );
            setFilteredApartments(filterAptmntts);
        } else {
            setFilteredApartments([]);
        }
    }

    const handleYearSelect = (year) => {
        setSelectedYear(year);
        setReportData((prevData) => ({
            ...prevData,
            year: year
        }))
    }

    const handleApartmentChange = (id) => {
        const val = id === "" || id === null ? "" : parseInt(id);
        setReportData((prevData) => ({
            ...prevData,
            aptmntId: parseInt(val)
        }))
    }

    const handlePrintReport = useReactToPrint({
        contentRef: reportRef,
        documentTitle: 'Yearly_Report',
    });

    return (
        <div>
            <Card className='mw-100'>
                <Card.Header className='text-center bg-dark text-light'>
                    <h3>YEARLY REPORTS GENERATOR</h3>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            {/* Building Dropdown filter */}
                            <Form.Group controlId="buildingSelect">
                                <Form.Label>Select Building</Form.Label>
                                <Form.Control as="select" value={selectedBuilding} onChange={handleBuildingChange}>
                                    <option value="">Select Building</option>
                                    {bldngData.map(bldng => (
                                        <option key={bldng.bldngId} value={bldng.bldngId}>
                                            {bldng.buildingName}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            {/* Apartment Dropdown filter */}
                            <Form.Group controlId="apartmentSelect">
                                <Form.Label>Select Apartment</Form.Label>
                                <Form.Control as="select" value={reportData.aptmntId}
                                    onChange={(e) => handleApartmentChange(e.target.value)}
                                >
                                    <option value="">Select Apartment</option>
                                    {filteredApartments.map(aptmnt => (
                                        <option key={aptmnt.aptmntId} value={aptmnt.aptmntId}>
                                            {aptmnt.aptmntNo} ({aptmnt.floorName})
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            {/* Year Selector */}
                            <Form.Group controlId="yearSelect">
                                <Form.Label >Select Year and Month</Form.Label>
                                <YearAccordion
                                    startYear={1961}
                                    onChange={handleYearSelect}
                                    selectedYear={selectedYear}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='generate-report-btn-row mt-3'>
                        <Col className='text-center'>
                            <button
                                className='btn btn-dark generate-report-btn'
                                onClick={handleGenerateReport}
                            >
                                Generate Report
                            </button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {transactionList.length > 0 ? (
                <Card className='mt-4 mw-100'>
                    <Card.Header className='bg-dark text-light'>
                        <Row className="align-items-center">
                            <Col xs={2}></Col>
                            <Col xs={8} className='text-center'>
                                <h5 className='mb-0 fw-bolder'>TRANSACTIONS</h5>
                            </Col>
                            <Col xs={2} className='text-end'>
                                <ArrowDownSquareFill
                                    className='cursor-pointer'
                                    style={{ cursor: 'pointer' }}
                                    size={30}
                                    onClick={handlePrintReport}
                                />
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <div ref={reportRef} className="print-container">
                            <div style={{
                                maxHeight: '500px',
                                overflowY: 'auto',
                                position: 'relative', // Keeps sticky relative to this box
                                border: '1px solid #dee2e6'
                            }}

                            >
                                <Table striped bordered hover responsive
                                    style={{
                                        marginBottom: 0,
                                        borderCollapse: 'separate',
                                        borderSpacing: 0
                                    }}
                                    className='text-center'
                                >
                                    <thead>
                                        <tr>
                                            {["Date", "Building Block", "Apartment No", "Amount", "Category", "Transaction Remarks"].map((header) => (
                                                <th
                                                    key={header}
                                                    style={{
                                                        position: 'sticky',
                                                        top: 0,
                                                        backgroundColor: '#212529', // Matching your bg-dark theme
                                                        color: 'white',
                                                        zIndex: 10,
                                                        borderBottom: '2px solid #454d55'
                                                    }}
                                                >
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactionList.map((transaction, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {transaction.transactionDate
                                                        ? new Date(transaction.transactionDate).toLocaleDateString()
                                                        : <span className="text-muted italic">Date Missing</span>}
                                                </td>
                                                <td>{transaction.buildingMst.buildingBlock}</td>
                                                <td>{transaction.aptmnt?.aptmntNo || "Building Level"}</td>
                                                <td>{transaction.transactionAmnt}</td>
                                                <td>{transaction.transactionCategory}</td>
                                                <td>{transaction.makerRmrks}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            ) : (
                <div className="text-center mt-5 text-muted">
                    <p>No transactions found for the selected criteria.</p>
                </div>
            )}

        </div>
    )
}

export default YearlyReports