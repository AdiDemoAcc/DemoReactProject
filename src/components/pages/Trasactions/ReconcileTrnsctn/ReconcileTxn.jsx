import React, { useEffect, useState } from 'react'
import TransactionService from '../../../service/TransactionService';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import '../../../css/ReconcileTxn.css'


const ReconcileTxn = () => {

    const [unauthTxnList, setUnauthTxnList] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TransactionService.getUnAuthTxnList();
                console.log("response: ", response);

                const { respObject, errorMsg, errorCd } = response;

                if (errorCd === "REQUEST_SUCCESS") {
                    setUnauthTxnList(respObject);
                } else {
                    console.error("Error: ", errorMsg);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        if (token) {
            fetchData();
        }
    }, [])

    return (
        <div>
            <Container className='display-unauth-txn-custom-container'>
                <Row className='display-unauth-txn-custom-header'>
                    <Col>
                        <h2>Transactions Pending Authorization</h2>
                    </Col>
                </Row>
                <div className='display-unauth-txn-custom-table-wrapper text-center'>
                    <Table striped bordered hover responsive="lg" className='display-unauth-txn-custom-table table-primary'>
                        <thead className='display-unauth-txn-custom-table-head'>
                            <tr className=''>
                                <th>Apartment No</th>
                                <th>Amount (Rs.)</th>
                                {/* <th>GL Account No</th> */}
                                <th>Transaction Date</th>
                                <th>Created On</th>
                                <th>Created By</th>
                                <th>Remarks</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {unauthTxnList.length > 0 ? (
                                unauthTxnList.map(txn => (
                                    <tr key={txn.transactionId}>
                                        <td>{txn.aptmnt.aptmntNo}</td>
                                        <td>{txn.transactionAmnt}</td>
                                        {/* <td>{txn.glAccount.accntNo}</td> */}
                                        <td>{txn.transactionDate ? new Date(txn.transactionDate).toDateString() : ''}</td>
                                        <td>
                                            {new Date(txn.makerDt).toLocaleDateString("en-US", {
                                                weekday: "short",
                                                year: "numeric",
                                                month: "short",
                                                day: "2-digit",
                                                timeZone: "Asia/Kolkata"
                                            })}
                                            <br />
                                            {new Date(txn.makerDt).toLocaleTimeString("en-IN", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit",
                                                hour12: true,
                                                timeZone: "Asia/Kolkata"
                                            })}
                                        </td>
                                        <td>{txn.makerCd}</td>
                                        <td>{txn.makerRmrks}</td>
                                        <td>
                                            <Button variant='outline-primary' >View More</Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No transactions found</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </div>
    )
}

export default ReconcileTxn