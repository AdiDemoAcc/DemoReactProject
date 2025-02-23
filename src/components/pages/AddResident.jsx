import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddResident = () => {
  return (
    <div style={{
      height: '100vh',
      paddingTop:'2%'
    }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '10px',
        width: '90%',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 className="text-center mb-4">Add Resident</h2>
        <Form>
          <Row className="mb-3">
            <Col md={6}><Form.Group><Form.Label>Occupant Name</Form.Label><Form.Control type="text" /></Form.Group></Col>
            <Col md={6}><Form.Group><Form.Label>Occupant Type</Form.Label><Form.Control type="text" /></Form.Group></Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}><Form.Group><Form.Label>Apartment ID</Form.Label><Form.Control type="number" /></Form.Group></Col>
            <Col md={6}><Form.Group><Form.Label>Is Leased</Form.Label><Form.Select><option>Select</option><option value="1">Yes</option><option value="0">No</option></Form.Select></Form.Group></Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}><Form.Group><Form.Label>Lease Start Date</Form.Label><Form.Control type="date" /></Form.Group></Col>
            <Col md={6}><Form.Group><Form.Label>Lease End Date</Form.Label><Form.Control type="date" /></Form.Group></Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}><Form.Group><Form.Label>Maker Remarks</Form.Label><Form.Control as="textarea" rows={3} /></Form.Group></Col>
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