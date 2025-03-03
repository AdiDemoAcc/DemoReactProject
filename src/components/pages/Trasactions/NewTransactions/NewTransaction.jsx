import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
import TransactionService from '../../../service/TransactionService';
import ResidentService from '../../../service/ResidentService';

import TransactionForm from './TransactionForm';

const NewTransaction = () => {
    const [txnCategory, setTxnCategory] = useState([]);
    const [txnType, setTxnType] = useState([]);
    const [filteredTxnType, setFilteredTxnType] = useState([]);
    const [txnAmnt, setTxnAmnt] = useState([]);
    const [filteredTxnAmnt, setFilteredTxnAmnt] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [apartments, setApartments] = useState([]);
    const [filteredApartments, setFilteredApartments] = useState([]);
    const [glAccntOptions , setGlAccntOptions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [transaction, setTransaction] = useState({
        transactionId: '',
        transactionDate: '',
        aptmntId: '',
        startDate: '',
        endDate: '',
        glAccntId: '',
        authStatus: '',
        transactionType: '',
        transactionAmnt: '',
        transactionCategory: '',
        makerCd: '',
        makerDt: '',
        makerRmrks: ''
    });

    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        const {name,value} = e.target;

        let updatedTransaction = {...transaction, [name] : value};

        if (name === "transactionCategory") {
            const categoryName = value;
            setSelectedCategory(categoryName);
        }

        setTransaction({ ...transaction, [e.target.name]: e.target.value });
    };

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await TransactionService.getTxnMstData(); 
              console.log(response);
  
              if (response?.errorCd === "REQUEST_SUCCESS") {
                  setTxnCategory(response.respObject.txnCategoryTypeData);
                  setTxnType(response.respObject.txnTypeData);
                  setTxnAmnt(response.respObject.txnAmntData);
              } else {
                  alert("Something went wrong. Please try again later.");
                  console.error("Error Message: ", response?.errorMsg);
              }
          } catch (error) {
              console.error("Transaction data fetch error:", error.response?.errorMsg || error.message);
          }
  
          // Fetch buildings and apartments data
          try {
              const res = await ResidentService.getBuildingAndApartmentData();
              if (res?.respObject) {
                  setBuildings(res.respObject.bldngList);
                  setApartments(res.respObject.aptmntList);
              }
          } catch (error) {
              console.error("Failed to fetch buildings and apartments:", error);
          }

          //Fetch Gl Accounts

          try {
            const resp = await TransactionService.getTxnGlAccntList();
            if (resp?.respObject) {
                setGlAccntOptions(resp.respObject);
            }
          } catch (error) {
            console.error("Failed to fetch Gl Accounts:", error);
          }
      };
  
      if (token) {
        fetchData(); 
      }
  }, []);
  

  useEffect(() => {

    if (selectedCategory && token) {
        const selectedCategoryObject = txnCategory.find(cat => cat.name === selectedCategory);
        if (selectedCategoryObject) {
            const filteredTxnAmnt = txnAmnt.filter(amount => Number(amount.id) === Number(selectedCategoryObject.id));
            const filteredTxnType = txnType.filter(type => Number(type.id) === Number(selectedCategoryObject.id));
            
            setFilteredTxnAmnt(filteredTxnAmnt);
            setFilteredTxnType(filteredTxnType);
            
            // Ensure txnAmnt is not empty before setting transactionAmnt
            if (filteredTxnAmnt.length > 0) {
                setTransaction(prevState => ({
                    ...prevState,
                    transactionAmnt: filteredTxnAmnt.length > 0 ? filteredTxnAmnt[0].name : "",
                    transactionType: filteredTxnType.length > 0 ? filteredTxnType[0].name : ""  
                }));
            }
        } else {
            setFilteredTxnType(txnType);
            setFilteredTxnAmnt(txnAmnt);
        }
    } else {
        setFilteredTxnType(txnType);
        setFilteredTxnAmnt(txnAmnt);
    }
  },[selectedCategory, txnCategory, txnType, txnAmnt])

    // Handle building selection and filter apartments accordingly
    const handleBuildingChange = (e) => {
        let selectedBuildingId = Number(e.target.value);
        // Filter apartments based on selected building
        const filteredApts = apartments.filter(apartment => Number(apartment.bldngId) === Number(selectedBuildingId));
        setFilteredApartments(filteredApts);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Transaction Submitted:", transaction);
      // Call API to save transaction here
  };

    return (

        <TransactionForm 
            transaction={transaction}
            txnTypeOptions={filteredTxnType}
            txnCategoryOptions={txnCategory}
            txnAmountOptions={filteredTxnAmnt}
            buildings={buildings}
            filteredApartments={filteredApartments}
            handleBuildingChange={handleBuildingChange}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            glAccntOptions={glAccntOptions}
            selectedCategory={selectedCategory} 
        />

        // <Container className="transaction-container">
        //     <Card className="transaction-card">
        //         <Card.Body>
        //             <Card.Title className="transaction-title">New Transaction</Card.Title>
        //             <Form onSubmit={handleSubmit}>
        //                 <Row className="g-3">
        //                     {/* Building Selection */}
        //                     <Col md={6}>
        //                         <Form.Group>
        //                             <Form.Label>Building</Form.Label>
        //                             <Form.Select name="buildingId" onChange={handleBuildingChange}>
        //                                 <option value="">Select a Building</option>
        //                                 {buildings.map((building) => (
        //                                     <option key={building.bldngId} value={building.bldngId}>
        //                                         {building.buildingName}
        //                                     </option>
        //                                 ))}
        //                             </Form.Select>
        //                         </Form.Group>
        //                     </Col>

        //                     {/* Apartment Selection */}
        //                     <Col md={6}>
        //                         <Form.Group>
        //                             <Form.Label>Apartment</Form.Label>
        //                             <Form.Select name="aptmntId" value={transaction.aptmntId} onChange={handleChange} disabled={filteredApartments.length === 0}>
        //                                 <option value="">Select an Apartment</option>
        //                                 {filteredApartments.map((apartment) => (
        //                                     <option key={apartment.aptmntId} value={apartment.aptmntId}>
        //                                         {apartment.aptmntNo}
        //                                     </option>
        //                                 ))}
        //                             </Form.Select>
        //                         </Form.Group>
        //                     </Col>

        //                     {/* Other Form Fields */}
        //                     {[
        //                         { name: "startDate", label: "Start Date", type: "date", col: 6 },
        //                         { name: "endDate", label: "End Date", type: "date", col: 6 },
        //                         { name: "glAccntId", label: "GL Account ID", type: "text", col: 6 },
        //                         { name: "transactionType", label: "Transaction Type", type: "text", col: 6 },
        //                         { name: "transactionAmnt", label: "Transaction Amount", type: "number", col: 6 },
        //                         { name: "transactionCategory", label: "Transaction Category", type: "text", col: 6 },
        //                         { name: "makerRmrks", label: "Remarks", type: "textarea", col: 12, rows: 3 }
        //                     ].map((field, index) => (
        //                         <Col md={field.col} key={index}>
        //                             <Form.Group>
        //                                 <Form.Label>{field.label}</Form.Label>
        //                                 <Form.Control
        //                                     as={field.type === "textarea" ? "textarea" : "input"}
        //                                     type={field.type !== "textarea" ? field.type : undefined}
        //                                     name={field.name}
        //                                     value={transaction[field.name]}
        //                                     onChange={handleChange}
        //                                     className="transaction-input"
        //                                     {...(field.rows && { rows: field.rows })}
        //                                 />
        //                             </Form.Group>
        //                         </Col>
        //                     ))}
        //                 </Row>

        //                 <div className="d-grid mt-4">
        //                     <Button type="submit" variant="primary" size="lg" className="transaction-button">
        //                         Submit Transaction
        //                     </Button>
        //                 </div>
        //             </Form>
        //         </Card.Body>
        //     </Card>
        // </Container>
    );
};

export default NewTransaction;
