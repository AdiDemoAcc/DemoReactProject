import React, { useEffect, useState } from 'react';
import TransactionService from '../../../service/TransactionService';
import { Button, Col, Container, Row, Table, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../../css/ReconcileTxn.css';

const ReconcileTxn = () => {
    const [unauthTxnList, setUnauthTxnList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [buildingFilter, setBuildingFilter] = useState('');
    const [txnTypeFilter, setTxnTypeFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TransactionService.getUnAuthTxnList();
                const { respObject, errorMsg, errorCd } = response;

                if (errorCd === "REQUEST_SUCCESS") {
                    setUnauthTxnList(respObject);
                    setFilteredList(respObject);
                } else {
                    console.error("Error: ", errorMsg);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (token) fetchData();
    }, [token]);

    const viewTransactionHandler = async (transactionId) => {
        try {
            const response = await TransactionService.getTransactionFromTransactionId(transactionId);
            const { respObject, errorCd, errorMsg } = response;
            if (errorCd === "REQUEST_SUCCESS") {
                navigate("/txn-details", { state: { txnDetails: respObject } });
            } else {
                console.error(errorMsg || "An error occurred");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Filter logic
    useEffect(() => {
        let updatedList = unauthTxnList;

        if (buildingFilter) {
            updatedList = updatedList.filter(txn => txn.buildingMst?.buildingName === buildingFilter);
        }

        if (txnTypeFilter) {
            updatedList = updatedList.filter(txn => txn.transactionType === txnTypeFilter);
        }

        if (categoryFilter) {
            updatedList = updatedList.filter(txn => txn.transactionCategory.toLowerCase().includes(categoryFilter.toLowerCase()));
        }

        if (searchQuery) {
            updatedList = updatedList.filter(txn =>
                (txn.aptmnt?.aptmntNo || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                txn.transactionCategory.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredList(updatedList);
    }, [buildingFilter, txnTypeFilter, categoryFilter, searchQuery, unauthTxnList]);

    // Unique Building Names
    const buildingNames = [...new Set(unauthTxnList.map(txn => txn.buildingMst?.buildingName))];

    return (
        <div>
            <Container className="display-unauth-txn-custom-container">
                <Row className="display-unauth-txn-custom-header mb-3">
                    <Col><h2>Transactions Pending Authorization</h2></Col>
                </Row>

                {/* Filters */}
                <Row className="mb-3">
                    <Col md={3}>
                        <Form.Select value={buildingFilter} onChange={(e) => setBuildingFilter(e.target.value)}>
                            <option value="">Filter by Building</option>
                            {buildingNames.map((bld, idx) => <option key={idx} value={bld}>{bld}</option>)}
                        </Form.Select>
                    </Col>
                    <Col md={3}>
                        <Form.Select value={txnTypeFilter} onChange={(e) => setTxnTypeFilter(e.target.value)}>
                            <option value="">Filter by Type</option>
                            <option value="Cr">Credit</option>
                            <option value="Db">Debit</option>
                        </Form.Select>
                    </Col>
                    <Col md={3}>
                        <Form.Control placeholder="Filter by Category" value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)} />
                    </Col>
                    <Col md={3}>
                        <Form.Control placeholder="Search (Apt No / Category)" value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} />
                    </Col>
                </Row>

                <div className="display-unauth-txn-custom-table-wrapper text-center">
                    <Table striped bordered hover responsive="lg" className="display-unauth-txn-custom-table table-primary">
                        <thead className="display-unauth-txn-custom-table-head">
                            <tr>
                                <th>Building</th>
                                <th>Apartment No</th>
                                <th>Amount (Rs.)</th>
                                <th>Type</th>
                                <th>Category</th>
                                <th>Transaction Date</th>
                                <th>Created On</th>
                                <th>Created By</th>
                                <th>Remarks</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredList.length > 0 ? (
                                filteredList.map(txn => (
                                    <tr key={txn.transactionId} className={txn.transactionType === "Cr" ? "credit-row" : "debit-row"}>
                                        <td>{txn.buildingMst?.buildingName}</td>
                                        <td>{txn.aptmnt ? txn.aptmnt.aptmntNo : 'Society Transaction'}</td>
                                        <td>{txn.transactionAmnt}</td>
                                        <td>{txn.transactionType}</td>
                                        <td>{txn.transactionCategory}</td>
                                        <td>{txn.transactionDate ? new Date(txn.transactionDate).toDateString() : ''}</td>
                                        <td>
                                            {new Date(txn.makerDt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })}
                                            <br />
                                            {new Date(txn.makerDt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}
                                        </td>
                                        <td>{txn.makerCd}</td>
                                        <td>{txn.makerRmrks}</td>
                                        <td>
                                            <Button size="sm" variant="outline-primary" onClick={() => viewTransactionHandler(txn.transactionId)}>View</Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="text-center">No transactions found</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </div>
    );
};

export default ReconcileTxn;
