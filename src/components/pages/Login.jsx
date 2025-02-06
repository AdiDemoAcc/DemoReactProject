import React, { useState } from 'react';
import { Card, Form, Container, Button } from 'react-bootstrap';
import '../css/Login.css';
import { LockFill, PersonFill } from 'react-bootstrap-icons';
import LoginService from '../service/LoginService';
import { backendUrl } from '../service/config';

const Login = () => {
    const [login, setLogin] = useState({
        username: '',
        password: '',
        clearSession: true,
    });

    const loginService = new LoginService(); 

    const handleChange = (event) => {
        const { name, value , type, checked } = event.target;
        if (type === 'checkbox') {
            setLogin((values) => ({...values, [name] : checked}))
        } else {
            setLogin((values) => ({ ...values, [name]: value }));
        }
    };


    const requestObject = {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(login)
    }

    const loginSubmitAction = (event) => {
        event.preventDefault();
        // loginService.loginService(requestObject);
         fetch(`${backendUrl}/T1000/S1001`,requestObject)
                .then(response => response.json())
                .then(async (response) => {
                    debugger;
                    console.log(response);
                })
    }


    return (
        <Container className="custom-login-dashboard-container" id="customLoginDashboardContainer">
            <Card className="custom-login-dashboard-card">
                <div className="custom-login-dashboard-card-content">
                    <Card.Header className="custom-login-dashboard-card-header">
                        <h1>Login User</h1>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={(e) => loginSubmitAction(e)}>
                            <div className="input-group mb-3">
                                <span className="input-group-text text-center">
                                    <PersonFill size={20} className="custom-login-dashboard-username-icon" />
                                </span>
                                <Form.Control type="text" name="username" value={login.username} onChange={handleChange} placeholder="Username" />
                            </div>
                            <div className="input-group mb-2">
                                <span className="input-group-text text-center">
                                    <LockFill size={20} className="custom-login-dashboard-password-icon" />
                                </span>
                                <Form.Control type="password" name="password" value={login.password} onChange={handleChange} placeholder="Password" />
                            </div>
                            <div className='row input-group ms-1 mb-3'>
                                <Form.Check className='col-sm-1' type='checkbox' name='clearSession' checked={login.clearSession} onChange={handleChange}/>
                                <span className='col-sm-auto'>Clear Last Session</span>
                            </div>
                            <div>
                                <Button type="submit" variant='outline-success' className='w-100 text-center'> Login</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </div>
            </Card>
        </Container>
    );
};

export default Login;
