import React, { useEffect, useState } from 'react';
import ResidentService from '../../../service/ResidentService';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../css/DisplayResidents.css";
import Select from 'react-select';

const DisplayResidents = () => {
    const [residents, setResidents] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [apartments, setApartments] = useState([]);
    const [selectedBuilding, setSelectedBuilding] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ResidentService.getAllResidents();
                setResidents(response.respObject.aptmntOccpntList);
                setBuildings(response.respObject.bldngList);
                setApartments(response.respObject.aptmntMstList);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (token) {
            fetchData();
        }
    }, []);

    // Filter apartments based on selected building
    const filteredApartments = selectedBuilding
        ? apartments.filter(apartment => Number(apartment.bldngId) === Number(selectedBuilding.value))
        : apartments;

    // Group apartments by floor
    const groupedByFloor = filteredApartments.reduce((acc, apartment) => {
        const floor = apartment.aptmntNo.charAt(0); // Extract floor number
        if (!acc[floor]) acc[floor] = [];
        acc[floor].push(apartment);
        return acc;
    }, {});

    return (
        <Container className="mt-4">
            {/* Header & Building Selection */}
            <Row className="mb-3 align-items-center">
                <Col md={3}>
                    <h2 className="text-white">Residents List</h2>
                </Col>
                <Col md={9}>
                    <Select
                        className="custom-select custom-view-resident-building-react"
                        options={buildings.map(bldng => ({ value: bldng.bldngId, label: bldng.buildingName }))}
                        value={selectedBuilding}
                        onChange={setSelectedBuilding}
                        placeholder="Select a Building"
                        isClearable
                    />
                </Col>
            </Row>

            {/* Apartments by Floor */}
            <Card className="shadow-lg show-residents-card">
                <Card.Body className='show-residents-container'>
                    {Object.entries(groupedByFloor).map(([floor, apartments]) => (
                        <div key={floor} className="mt-4">
                            <h4 className="text-center text-dark">Floor {floor}</h4>
                            <Row>
                                {apartments.map(apartment => {
                                    const resident = residents.find(res => res.aptmnt.aptmntId === apartment.aptmntId);
                                    return (
                                        <Col key={apartment.aptmntId} lg={6} className=" mb-3">
                                            <Card className="text-center apartment-card shadow-sm">
                                                <Card.Header className="apartment-header">
                                                    {apartment.aptmntNo}
                                                </Card.Header>
                                                <Card.Body>
                                                    <Card.Text className="occupant-name">
                                                        {resident ? resident.occupantName : "Vacant"}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </div>
                    ))}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default DisplayResidents;
