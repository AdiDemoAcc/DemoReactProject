// Improved DisplayResidents.jsx
import React, { useEffect, useState } from 'react';
import ResidentService from '../../../service/ResidentService';
import { Container, Row, Col, Card, Collapse, Button } from 'react-bootstrap';
import Select from 'react-select';
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';
import '../../../css/DisplayResidents.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const DisplayResidents = () => {
  const [residents, setResidents] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [collapsedFloors, setCollapsedFloors] = useState({});

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ResidentService.getAllResidents();
        const { aptmntOccpntList, bldngList, aptmntMstList } = response.respObject;
        setResidents(aptmntOccpntList);
        setBuildings(bldngList);
        setApartments(aptmntMstList);

        const defaultBuilding = bldngList.find(b => b.bldngId === 1);
        if (defaultBuilding) {
          setSelectedBuilding({ value: defaultBuilding.bldngId, label: defaultBuilding.buildingName });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (token) fetchData();
  }, [token]);

  const filteredApartments = selectedBuilding
    ? apartments.filter(apartment => Number(apartment.bldngId) === Number(selectedBuilding.value))
    : apartments;

  const groupedByFloor = filteredApartments.reduce((acc, apartment) => {
    const floor = apartment.floorNo;
    if (!acc[floor]) acc[floor] = [];
    acc[floor].push(apartment);
    return acc;
  }, {});

  const toggleCollapse = (floor) => {
    setCollapsedFloors(prev => ({ ...prev, [floor]: !prev[floor] }));
  };

  return (
    <Container fluid className="display-residents-main-container">
      <Row className="mb-4 align-items-center">
        <Col xs={12} md={4}>
          <h2 className=" mb-0">Residents List</h2>
        </Col>
        <Col xs={12} md={8}>
          <Select
            className="custom-select custom-view-resident-building-react"
            options={buildings.map(b => ({ value: b.bldngId, label: b.buildingName }))}
            value={selectedBuilding}
            onChange={setSelectedBuilding}
            placeholder="Select a Building"
            isClearable
          />
        </Col>
      </Row>

      <div className="display-residents-table-container">
        <Card className="show-residents-card">
          <Card.Body className="show-residents-container">
            {Object.entries(groupedByFloor)
              .sort((a, b) => Number(a[0]) - Number(b[0]))
              .map(([floor, floorApartments]) => (
                <div key={floor} className="mb-4">
                  <div className="d-flex justify-content-between align-items-center floor-header px-3 py-2">
                    <h5 className="mb-0">🛗 Floor {floor}</h5>
                    <Button
                      variant="light border-dark"
                      size="sm"
                      onClick={() => toggleCollapse(floor)}
                      className="toggle-button"
                    >
                      {collapsedFloors[floor] ? <ChevronDown /> : <ChevronUp />}
                    </Button>
                  </div>
                  <Collapse in={!collapsedFloors[floor]}>
                    <Row className="pt-3 px-2">
                      {floorApartments.map((apartment) => {
                        const resident = residents.find(res => res.aptmnt.aptmntId === apartment.aptmntId);
                        const isOccupied = !!resident;
                        return (
                          <Col key={apartment.aptmntId} xs={12} sm={6} md={4} lg={3} className="mb-3">
                            <Card className={`apartment-card ${isOccupied ? 'occupied' : 'vacant'}`}>
                              <Card.Header className="apartment-header">
                                {apartment.aptmntNo}
                              </Card.Header>
                              <Card.Body>
                                <Card.Text className="occupant-name">
                                  {resident ? resident.occupantName : 'Vacant'}
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </Col>
                        );
                      })}
                    </Row>
                  </Collapse>
                </div>
              ))}
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default DisplayResidents;
