import React, { useState } from 'react';
import { Card, Form, Container, Button } from 'react-bootstrap';
import '../css/Login.css';
import { LockFill, PersonFill } from 'react-bootstrap-icons';
import LoginService from '../service/LoginService';
import { backendUrl } from '../service/config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [login, setLogin] = useState({
        username: '',
        password: '',
        clearSession: true,
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === 'checkbox') {
            setLogin((values) => ({ ...values, [name]: checked }))
        } else {
            setLogin((values) => ({ ...values, [name]: value }));
        }
    };

    let navigate = useNavigate();

    /* const userLoginObject = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(login)
    } */

    const loginSubmitAction = async (event) => {
        event.preventDefault();
        if (localStorage.getItem('token') || localStorage.getItem('user')) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
        /* loginService.loginService(login)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errResponse => {
                        const { errorMsg, errorCd } = errResponse;
                        console.error(`Error Message: ${errorMsg}, Error Code: ${errorCd}`);
                        throw new Error(`HTTP Error! Status: ${response.status}`);
                    });
                }
                return response.json(); 
            }).then(response => {
                const { respObject, errorMsg, errorCd } = response;
                if (errorCd === 'USER_AUTHENTICATED') {
                    alert('Login Successful')
                    
                    const {user, token} = respObject;
                    localStorage.setItem('token',token);
                    localStorage.setItem('user',JSON.stringify(user));
                    navigate('/dashboard');
                } else if (errorCd === 'BAD_CREDENTIALS') {
                    alert(`${errorMsg}`);
                } else if (errorCd === 'USER_UNAUTHENTICATED') {
                    alert(`${errorMsg}`);
                } else if (errorCd === 'LOGIN_FAILED') {
                    alert(`${errorMsg}`);
                } else {
                    alert("Something went wrong. Please try again later!!");
                    console.error(errorMsg);
                    console.error(errorCd );    
                }
            }).catch(error => {
                console.error('Login failed:', error);
            }); */

        try {
            const response = await LoginService.loginService(login);
            const { respObject, errorMsg, errorCd } = response;

            if (errorCd === "USER_AUTHENTICATED") {
                const user = respObject.user;
                let roleId =  user.roleId;
                let token = respObject.token;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));

                // console.log("roleId: ",roleId);

                const menuResponse = await LoginService.menuMapService(roleId,token);
                
                const {respObject: menuData,errorMsg: menuErrorMsg,errorCd : menuErrorCd} = menuResponse;
                if (menuErrorCd === "REQUEST_SUCCESS") {
                    localStorage.setItem("menuItemList",JSON.stringify(menuData.menuItemMstList));
                    localStorage.setItem("menuList",JSON.stringify(menuData.menuMstList));
                    navigate("/dashboard");
                } else {
                    alert("Something went wrong.");
                    console.error("Error: ",menuErrorMsg);
                }
                
            } else {
                alert(errorMsg || "Login Failed");
            }
        } catch (error) {
            alert(error.errorMsg || "Something went wrong");
            console.error("Login Failed: ",error);
        }

    }


    return (
        <Container className="custom-login-dashboard-container" id="customLoginDashboardContainer">
            <Card className="custom-login-dashboard-card">
                <div className="custom-login-dashboard-card-content">
                    <Card.Header className="custom-login-dashboard-card-header" style={{ border: 'none' }}>
                        <img className='custom-login-logo-image' id='loginLogoImage'></img>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={(e) => loginSubmitAction(e)}>
                            <div className="input-group mb-3">
                                <span className="input-group-text text-center">
                                    <PersonFill size={20} className="custom-login-dashboard-username-icon" />
                                </span>
                                <Form.Control type="text" name="username" value={login.username} onChange={handleChange} placeholder="Username" />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text text-center">
                                    <LockFill size={20} className="custom-login-dashboard-password-icon" />
                                </span>
                                <Form.Control type="password" name="password" value={login.password} onChange={handleChange} placeholder="Password" />
                            </div>
                            <div className='row ms-1 mb-3 d-flex align-items-center'>
                                <div className="custom-checkbox-container">
                                    <Form.Check type="checkbox" name="clearSession" checked={login.clearSession} onChange={handleChange} className="custom-checkbox" />
                                    <label className="custom-checkbox-label">Clear Last Session</label>
                                </div>
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
