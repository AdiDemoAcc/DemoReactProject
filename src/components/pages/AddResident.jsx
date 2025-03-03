import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResidentService from '../service/ResidentService';
import { useNavigate } from 'react-router-dom';

const AddResident = () => {

  const [bldngData, setBldngData] = useState([]);
  const [aptmntData, setAptmntData] = useState([]);
  const [sortedBldngData, setSortedBldngData] = useState([]);

  

  const [occupantData, setOccupantData] = useState({
    "occupantType":"",
    "aptmntId" : "",
    "occupantName" : "",
    "isLeased" : "0",
    "leaseStartDate" : "",
    "leaseEndDate" : "",
    "makerCd" : "",
    "makerRmrks" : ""
  })

  const onChangeHandler = (event) => {
    event.preventDefault();
    const {name,value} = event.target;
    setOccupantData((prevData) => ({
      ...prevData,
      [name] : value
    }))
  }

  const token = localStorage.getItem("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // console.log("Resident Data: ",occupantData);
    try {
      const response = await ResidentService.addResidentInfoMaker(occupantData);
      // console.log("Response: ",response);
      const { respObject, errorCd, errorMsg } = response;
      if (errorCd === "REQUEST_SUCCESS") {
        alert("Resident added successfully");
        navigate("/show-residents");
      } else {
        alert("Something went wrong. Please try again later.");
      }

    } catch (error) {
      alert("Failed to add resident. Please try again.");
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ResidentService.getBuildingAndApartmentData();

        if (response && response.errorCd === "REQUEST_SUCCESS") {
          setBldngData(response.respObject.bldngList);
          setAptmntData(response.respObject.aptmntList);
        } else {
          alert("Something went wrong. Please try again later");
          console.log("Message: ", response?.errorMsg || "Uknown error");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Fetch error: ", error);
        alert("Something went wrong. Please try again later");
        navigate("/dashboard");
      }
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user && user.userId) {
      setOccupantData((resident) => ({
        ...resident,
        makerCd: user.userId,
      }))
    }
    if (token) {
      fetchData();  
    }
    

  }, [navigate])

  const onBldngChangeHandler = (event) => {
    const val = Number(event.currentTarget.value);
    if (val !== "-1") {
      const filteredApts = aptmntData.filter(apt => Number(apt.bldngId) === val);
      setSortedBldngData(filteredApts || []); // Ensure it doesn't become null
    } else {
      setSortedBldngData([]); // Reset when no building is selected
    }
  };

  return (
    <div style={{
      height: '90vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        overflowY: 'auto'
      }}>
        <h2 className="text-center mb-4">Add Resident</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Occupant Name</Form.Label>
                <Form.Control type="text" name='occupantName' value={occupantData.occupantName} onChange={onChangeHandler} required/>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Occupant Type</Form.Label>
                <Form.Control type="text" name='occupantType' value={occupantData.occupantType} onChange={onChangeHandler} required/>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Building</Form.Label>
                <Form.Select name="buildingSelect" onChange={(e) => onBldngChangeHandler(e)}>
                  <option value="-1">Select Building</option>
                  {bldngData.map((bldng) => (
                    <option key={bldng.bldngId} value={bldng.bldngId}>
                      {bldng.buildingName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Apartment</Form.Label>
                <Form.Select name='aptmntId' value={occupantData.aptmntId} onChange={onChangeHandler}>
                  <option value="-1" disabled>Select</option>
                  {sortedBldngData.length > 0 ? (
                    sortedBldngData.map((aptmnt, index) => (
                      aptmnt && (
                        <option key={index} value={aptmnt.aptmntId}>
                          {aptmnt.aptmntNo}
                        </option>
                      )
                    ))
                  ) : (
                    <option disabled>No Data</option>
                  )}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            {/* <Col md={6}><Form.Group><Form.Label>Apartment ID</Form.Label><Form.Control type="number" /></Form.Group></Col> */}
            <Col md={12}>
              <Form.Group>
                <Form.Label>Is Leased</Form.Label>
                <Form.Select name='isLeased'value={occupantData.isLeased} onChange={onChangeHandler}>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          {occupantData.isLeased === "1" ? (
            <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Lease Start Date</Form.Label>
                <Form.Control type="date" name='leaseStartDate' value={occupantData.leaseStartDate} onChange={onChangeHandler}/>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Lease End Date</Form.Label>
                <Form.Control type="date" name='leaseEndDate' value={occupantData.leaseEndDate} onChange={onChangeHandler}/>
              </Form.Group>
            </Col>
          </Row>
          ) : (
            <div></div>
          )}

          {/* <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Lease Start Date</Form.Label>
                <Form.Control type="date" name='leaseStartDate' value={occupantData.leaseStartDate} onChange={onChangeHandler}/>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Lease End Date</Form.Label>
                <Form.Control type="date" name='leaseEndDate' value={occupantData.leaseEndDate} onChange={onChangeHandler}/>
              </Form.Group>
            </Col>
          </Row> */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Maker Remarks</Form.Label>
                <Form.Control as="textarea" rows={3} name='makerRmrks' value={occupantData.makerRmrks} onChange={onChangeHandler}/>
              </Form.Group>
            </Col>
          </Row>
          <div className="text-center">
            <Button variant="primary" type="submit">Submit</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddResident;
