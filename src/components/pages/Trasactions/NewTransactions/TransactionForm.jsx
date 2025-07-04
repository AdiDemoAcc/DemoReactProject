import React, { useEffect } from 'react'
import transactionfields from './TransactionFields'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import '../../../css/NewTransaction.css'; 

const TransactionForm = ({
    transaction,
    txnTypeOptions,
    txnCategoryOptions,
    txnAmountOptions,
    glAccntOptions,
    buildings,
    filteredApartments,
    handleChange,
    handleBuildingChange,
    handleSubmit,
    selectedCategory
}) => {

    const fields = transactionfields(txnTypeOptions, txnCategoryOptions, txnAmountOptions, glAccntOptions, buildings, filteredApartments,selectedCategory,transaction)

    return (
        <Container fluid className='transaction-container'>
            <Card className='transaction-card'>
                <Card.Body>
                    <Card.Title className='transaction-title'>New Transaction</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Row className='g-3'>
                            {fields.map((field, index) => (
                                <Col md={field.col} key={index}>
                                    <Form.Group>
                                        <Form.Label>{field.label} {field.required && <span className="text-danger">*</span>}</Form.Label>
                                        {field.type === "select" ? (
                                            <Form.Select
                                                name={field.name}
                                                value={transaction[field.name]}
                                                onChange={field.name === "buildingId" ? handleBuildingChange : handleChange}
                                                disabled={field.disabled}
                                                defaultValue=""
                                                required = {field.required}
                                            >
                                                { field.name !== "transactionType" && (<option value="" disabled>Select {field.label}</option>)   }
                                                {field.options.map((option) => (
                                                    <option key={option[field.optionsId]} value={option[field.valueId]}>
                                                        {field.name === "transactionType" ?  option.name === "Cr" ? "Credit Amount" : "Debit Amount" : option.name || option.buildingName || option.aptmntNo || option.accntNo}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        ) : (
                                            <Form.Control
                                                as={field.type === "textarea" ? "textarea" : "input"}
                                                type={field.type !== "textarea" ? field.type : undefined}
                                                name={field.name}
                                                value={field.name === "transactionAmnt" && transaction[field.name] === "-1" ? "" : transaction[field.name]}
                                                onChange={handleChange}
                                                {...(field.row && { rows: field.row })}
                                                disabled={field.disabled} 
                                                required = {field.required}
                                            />
                                        )}
                                    </Form.Group>
                                </Col>
                            ))}
                        </Row>
                        <div className="d-grid mt-4">
                            <Button type="submit" variant="primary" size="lg" className="transaction-button">
                                Submit Transaction
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default TransactionForm