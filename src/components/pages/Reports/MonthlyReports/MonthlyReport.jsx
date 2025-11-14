import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import ResidentService from '../../../service/ResidentService';
import YearMonthAccordion from '../PageComponents/YearMonthAccordion';

const MonthlyReport = () => {

  const [data, setData] = useState(null);

  const [aptmntData, setAptmntData] = useState([]);
  const [bldngData, setBldngData] = useState([]);

  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [filteredApartments, setFilteredApartments] = useState([]);

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
                  <Form.Select disabled={!selectedBuilding} >
                    <option value="">---Select Apartment---</option>
                    {filteredApartments.map(apt => (
                      <option key={apt.aptmntId} value={apt.aptmntId}>
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
                <YearMonthAccordion startYear={1961} />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default MonthlyReport