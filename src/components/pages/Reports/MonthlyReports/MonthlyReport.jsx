import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import ResidentService from '../../../service/ResidentService';
import YearMonthAccordion from '../PageComponents/YearMonthAccordion';
import '../../../css/MonthlyReport.css'
import ReportService from '../../../service/ReportService';

const MonthlyReport = () => {

  const [data, setData] = useState(null);

  const [aptmntData, setAptmntData] = useState([]);
  const [bldngData, setBldngData] = useState([]);

  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [reportData, setReportData ] = useState({
    aptmntId : '',
    txnMonth : '',
    txnYear : ''
  })
  
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      ResidentService.getBuildingAndApartmentData()
        .then(response => {
          console.log("API Response : ", response);
          if (response && response.respObject) {
            setData(response.respObject);

            setAptmntData(response.respObject.aptmntList);

            setBldngData(response.respObject.bldngList);
          }
        })
    }
  }, [])

  const handleBuildingChange = (e) => {
    const bldngId = e.target.value;
    setSelectedBuilding(bldngId);

    if (bldngId) {
      const filterAptmntts = aptmntData.filter(
        (apt) => apt.bldngId === parseInt(bldngId)
      );
      setFilteredApartments(filterAptmntts);
    } else {
      setFilteredApartments([]);
    }
  }
  
  const handleDateSelect = (year, month) => {
    setReportData((prevData) => ({
      ...prevData,
      txnMonth : month,
      txnYear : year
    }))
  }
  
  
  const handleApartmentChange = (id) => {
    setReportData((prevData) => ({
      ...prevData,
      aptmntId : parseInt(id)
    }))
  }
  
  const handleGenerateReport = async () => {
    try {
      console.log("Report request data: ",reportData);
      const response = await ReportService.generateMonthlyReport(reportData);
      console.log("response: ",response);
      
      if (response) {
          const fileBlob = new Blob([response],{type : 'application/pdf'});
          const fileUrl = URL.createObjectURL(fileBlob);
          setPreviewUrl(fileUrl);
          console.log("Preview URL created:", fileUrl);
      }
    } catch (error) {
      console.error("Error generating report", err);
    }
  }

  return (
    <div>
      <Container>
        <Card className='mw-100'>
          <Card.Header className='text-center bg-dark text-light'>
            <h4>MONTHLY REPORT GENERATOR</h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                {/* Building Dropdown Filter */}
                <Form.Group className='mb-3'>
                  <Form.Label>Building</Form.Label>
                  <Form.Select value={selectedBuilding} onChange={handleBuildingChange}>
                    <option value="">---Select Building---</option>
                    {bldngData.map((bldng) => (
                      <option key={bldng.bldngId} value={bldng.bldngId}>
                        {bldng.buildingName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                {/* Apartment Dropdown Filter */}
                <Form.Group className='mb-3'>
                  <Form.Label>Apartment</Form.Label>
                  <Form.Select disabled={!selectedBuilding} onChange={(e) => handleApartmentChange(e.target.value)}>
                    <option value="">---Select Apartment---</option>
                    {filteredApartments.map(apt => (
                      <option key={apt.aptmntId} value={apt.aptmntId} >
                        {apt.aptmntNo} ({apt.floorName})
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              {/* <Col>
                  <Form.Label>From Date</Form.Label>
                  <Form.Control type='date' name='fromDate' />
              </Col> */}
              {/* <Col>
                    <Form.Label>Select Month</Form.Label>
                    <input className='form-control' type={'Date'} name='month'/>
              </Col> */}
              <Col>
                <Form.Label >Select Year and Month</Form.Label>
                <YearMonthAccordion startYear={1961} onChange={handleDateSelect} />
              </Col>
            </Row>
            <Row className='generate-report-btn-row'>
              <Button className='btn btn-dark generate-report-btn' onClick={handleGenerateReport}>Generate Report</Button>
            </Row>
          </Card.Body>
        </Card>
        
        {previewUrl && (
          <div className='mt-4'>
            <h5>Preview</h5>
            <iframe 
              src={previewUrl}
              width='100%'
              height='600px'
              title='Bill Preview'
              style={{border: '1px solid #ccc'}}
            />
          </div>
        )}
        
      </Container>
    </div>
  )
}

export default MonthlyReport