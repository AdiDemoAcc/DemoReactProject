import React, { useEffect, useState } from 'react';
import ResidentService from '../../../service/ResidentService';
import { useParams } from 'react-router-dom';
import { Card, Col, Row, Table } from 'react-bootstrap';
import '../../../css/ViewResident.css'; 

const ViewResident = () => {
    const { aptmntId } = useParams();
    const [apartment, setApartment] = useState(null);
    const [occupant, setOccupant] = useState(null);
    const [currentMonthTransactions, setCurrentMonthTransactions] = useState([]);
    const [pastTransactions, setPastTransactions] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchResident = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            const reqObj = {
                "username": user.username,
                "roleName": user.roleName,
                "aptmntId": aptmntId
            };
            const response = await ResidentService.getResidentData(reqObj);
            if (response?.respObject) {
                const { aptmntData, occpntData, txnRecData } = response.respObject;
                
                setApartment(aptmntData);
                setOccupant(occpntData?.[0]); // Assuming only one current occupant
                
                const now = new Date();
                const currentMonth = now.getMonth() + 1;
                const currentYear = now.getFullYear();

                const currentTxns = txnRecData.filter(txn => {
                    const txnDate = new Date(txn.transactionDate);
                    return txnDate.getMonth() + 1 === currentMonth && txnDate.getFullYear() === currentYear;
                });

                const pastTxns = txnRecData.filter(txn => {
                    const txnDate = new Date(txn.transactionDate);
                    return txnDate.getMonth() + 1 !== currentMonth || txnDate.getFullYear() !== currentYear;
                });

                setCurrentMonthTransactions(currentTxns);
                setPastTransactions(pastTxns);
            }
        };

        if (token && aptmntId) {
            fetchResident();
        }
    }, [aptmntId]);

    return (
        <div className="container custom-view-resident-container mt-2   ">
            <Row>
                <Col>
                    {apartment && (
                        <Card className="custom-view-resident-card">
                            <Card.Header className='text-center card-custom-view-resident-header'>
                                <h4>Apartment Details</h4>
                            </Card.Header>
                            <Card.Body>
                                <Table className="table-view-resident-custom">
                                    <tbody>
                                        <tr>
                                            <th>Apartment No</th>
                                            <td>{apartment.aptmntNo}</td>
                                        </tr>
                                        <tr>
                                            <th>Description</th>
                                            <td>{apartment.aptmntDesc}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
                <Col>
                    {occupant && (
                        <Card className="custom-view-resident-card">
                            <Card.Header className='text-center card-custom-view-resident-header'>
                                <h4>Current Resident</h4>
                            </Card.Header>
                            <Card.Body>
                                <Table className="table-view-resident-custom">
                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <td>{occupant.occupantName}</td>
                                        </tr>
                                        <tr>
                                            <th>Type</th>
                                            <td>{occupant.occupantType}</td>
                                        </tr>
                                        <tr>
                                            <th>Lease Start</th>
                                            <td>{new Date(occupant.leaseStartDate).toLocaleDateString()}</td>
                                        </tr>
                                        <tr>
                                            <th>Lease End</th>
                                            <td>{new Date(occupant.leaseEndDate).toLocaleDateString()}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>

            {/* Current Transactions */}
            <Card className="custom-view-resident-card mt-3">
                <Card.Header className='text-center card-custom-view-resident-header'>
                    <h4>Current Month Transactions</h4>
                </Card.Header>
                <Card.Body>
                    <Table className="table-view-resident-custom text-center">
                        <thead>
                            <tr>
                                <th>Date</th>
                                {/* <th>Type</th> */}
                                <th>Amount</th>
                                <th>GL Account No</th>
                                <th>Category</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMonthTransactions.length > 0 ? (
                                currentMonthTransactions.map(txn => (
                                    <tr key={txn.transactionId}>
                                        <td>{new Date(txn.transactionDate).toLocaleDateString()}</td>
                                        {/* <td>{txn.transactionType}</td> */}
                                        <td>{txn.transactionAmnt.toFixed(2)}</td>
                                        <td>{txn.glAccount.accntNo}</td>
                                        <td>{txn.transactionCategory}</td>
                                        <td>{txn.makerRmrks}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No transactions found</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* Past Transactions */}
            <Card className="custom-view-resident-card mt-3">
                <Card.Header className='text-center card-custom-view-resident-header'>
                    <h4>Past Transactions</h4>
                </Card.Header>
                <Card.Body>
                    <Table className="table-view-resident-custom text-center">
                        <thead>
                            <tr>
                                <th>Date</th>
                                {/* <th>Type</th> */}
                                <th>Amount</th>
                                <th>GL Account No</th>
                                <th>Category</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody className='custom-view-resident-past-txn-table'>
                            {pastTransactions.length > 0 ? (
                                pastTransactions.map(txn => (
                                    <tr key={txn.transactionId}>
                                        <td>{new Date(txn.transactionDate).toLocaleDateString()}</td>
                                        {/* <td>{txn.transactionType}</td> */}
                                        <td>{txn.transactionAmnt.toFixed(2)}</td>
                                        <td>{txn.glAccount.accntNo}</td>
                                        <td>{txn.transactionCategory}</td>
                                        <td>{txn.makerRmrks}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">No past transactions found</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ViewResident;