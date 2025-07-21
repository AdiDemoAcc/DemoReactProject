import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, ButtonGroup } from 'react-bootstrap';
import '../../../css/TransactionDetails.css';

const TransactionDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state || !state.txnDetails) {
        return <Container><p>No transaction data available.</p></Container>;
    }

    const { transactionRecord, building } = state.txnDetails;

    return (
        <Container className="txn-details-container">
            <Button variant="secondary" onClick={() => navigate(-1)} className="txn-details-back-btn">← Back</Button>
            <h2 className="txn-details-header">Transaction Details</h2>

            <Row>
                <Col md={6}>
                    <Card className="txn-details-card">
                        <div className="txn-details-card-header">Apartment Details</div>
                        <div className="txn-details-card-body">
                            <p><span className="txn-details-label">No:</span> <span className="txn-details-value">{transactionRecord.aptmnt?.aptmntNo || 'N/A'}</span></p>
                            <p><span className="txn-details-label">Description:</span> <span className="txn-details-value">{transactionRecord.aptmnt?.aptmntDesc || 'N/A'}</span></p>
                            <p><span className="txn-details-label">Floor:</span> <span className="txn-details-value">{transactionRecord.aptmnt?.floorName || 'N/A'}</span></p>
                        </div>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="txn-details-card">
                        <div className="txn-details-card-header">Building Details</div>
                        <div className="txn-details-card-body">
                            <p><span className="txn-details-label">Name:</span> <span className="txn-details-value">{building?.buildingName}</span></p>
                            <p><span className="txn-details-label">Block:</span> <span className="txn-details-value">{building?.buildingBlock}</span></p>
                            <p><span className="txn-details-label">Apartments:</span> <span className="txn-details-value">{building?.noOfApartments}</span></p>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Card className="txn-details-card">
                        <div className="txn-details-card-header">Transaction Info</div>
                        <div className="txn-details-card-body">
                            <p><span className="txn-details-label">Type:</span> <span className="txn-details-value">{transactionRecord.transactionType}</span></p>
                            <p><span className="txn-details-label">Amount:</span> ₹{transactionRecord.transactionAmnt}</p>
                            <p><span className="txn-details-label">Category:</span> {transactionRecord.transactionCategory}</p>
                            <p><span className="txn-details-label">Date:</span> {new Date(transactionRecord.transactionDate).toLocaleDateString()}</p>
                        </div>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="txn-details-card">
                        <div className="txn-details-card-header">GL Account</div>
                        <div className="txn-details-card-body">
                            <p><span className="txn-details-label">Account No:</span> {transactionRecord.glAccount?.accntNo}</p>
                            <p><span className="txn-details-label">Bank:</span> {transactionRecord.glAccount?.bankName}</p>
                            <p><span className="txn-details-label">Branch:</span> {transactionRecord.glAccount?.bankBranch}</p>
                            <p><span className="txn-details-label">Balance:</span> ₹{transactionRecord.glAccount?.accntBal}</p>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Card className="txn-details-card">
                <div className="txn-details-card-header">Audit Trail</div>
                <div className="txn-details-card-body">
                    <p><span className="txn-details-label">Maker:</span> User Id: {transactionRecord.makerCd} created transaction on {new Date(transactionRecord.makerDt).toLocaleString()}</p>
                    <p><span className="txn-details-label">Remarks:</span> {transactionRecord.makerRmrks}</p>
                    <p><span className="txn-details-label">Status:</span> {transactionRecord.authStatus === 1 ? 'Authorized' : transactionRecord.authStatus === 2 ? 'Rejected' :'Pending'}</p>
                </div>
            </Card>
            
            <Row>
                <ButtonGroup>
                    <Button variant='outline-success' >Approve</Button>
                    <Button variant='outline-danger' >Reject</Button>
                </ButtonGroup>
            </Row>
        </Container>
    );
};

export default TransactionDetails;
