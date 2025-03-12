import React, { useEffect, useState } from 'react';
import { Card, Form, Container, Button } from 'react-bootstrap';
import '../../css/Login2.css';
import { LockFill, PersonFill } from 'react-bootstrap-icons';
import LoginService from '../../service/LoginService';
import { useNavigate } from 'react-router-dom';
import logo from "../../images/logo.png";

const LoginForm = () => {
    const [login, setLogin] = useState({
        username: '',
        password: '',
        clearSession: true,
    });

    const navigate = useNavigate();

    // Redirect to dashboard if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard", { replace: true });
        }
    }, [navigate]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === 'checkbox') {
            setLogin((values) => ({ ...values, [name]: checked }))
        } else {
            setLogin((values) => ({ ...values, [name]: value }));
        }
    };

    /* const userLoginObject = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(login)
    } */

    const loginSubmitAction = async (event) => {
        event.preventDefault();
        
        // Clear old session data
        // localStorage.removeItem('token');
        // localStorage.removeItem('user');
        // localStorage.removeItem("sessionId");
        // localStorage.removeItem("menuItemList");
        // localStorage.removeItem("menuList");

        localStorage.clear();
        console.log("Removing localstorage data Login - Line 52");
        try {
            const response = await LoginService.loginService(login);
            const { respObject, errorMsg, errorCd } = response;

            if (errorCd === "USER_AUTHENTICATED") {
                const user = respObject.user;
                let roleId = user.roleId;
                let token = respObject.token;
                let sessionId = respObject.sessionId;
                let expiresIn = 86400;
                let expirationTime = new Date().getTime() + expiresIn*1000;

                // Store user session data
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("sessionId",sessionId);
                localStorage.setItem("expirationTime",expirationTime);
                const menuResponse = await LoginService.menuMapService(roleId);
                const { respObject: menuData, errorMsg: menuErrorMsg, errorCd: menuErrorCd } = menuResponse;
                console.log("Menu Response: ",menuData);

                if (menuErrorCd === "REQUEST_SUCCESS") {
                    localStorage.setItem("menuItemList", JSON.stringify(menuData.menuItemMstList));
                    localStorage.setItem("menuList", JSON.stringify(menuData.menuMstList));

                    // Redirect to dashboard
                    navigate("/dashboard");
                } else {
                    alert("Something went wrong.");
                    console.error("Error: ", menuErrorMsg);
                }
                
            } else {
                alert(errorMsg || "Login Failed");
            }
        } catch (error) {
            alert(error.errorMsg || "Something went wrong");
            console.error("Login Failed: ", error);
        }
    };

    return (
        <Container className="custom-login-dashboard-container" id="customLoginDashboardContainer">
            <Card className="custom-login-dashboard-card">
                <div className="custom-login-dashboard-card-content">
                    <Card.Header className="custom-login-dashboard-card-header" style={{ border: 'none' }}>
                        <img src={logo} alt="Ledgerly Logo" className='custom-login-logo-image' id='loginLogoImage'></img>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={(e) => loginSubmitAction(e)}>
                            <div className="input-group mb-3">
                                <span className="input-group-text text-center">
                                    <PersonFill size={20} className="custom-login-dashboard-username-icon" />
                                </span>
                                <Form.Control type="text" name="username" value={login.username} onChange={handleChange} placeholder="Username" required />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text text-center">
                                    <LockFill size={20} className="custom-login-dashboard-password-icon" />
                                </span>
                                <Form.Control type="password" name="password" value={login.password} onChange={handleChange} placeholder="Password" required />
                            </div>
                            <div className='row ms-1 mb-3 d-flex align-items-center'>
                                <div className="custom-checkbox-container">
                                    <Form.Check type="checkbox" name="clearSession" checked={login.clearSession} onChange={handleChange} className="custom-checkbox" />
                                    <label className="custom-checkbox-label">Clear Last Session</label>
                                </div>
                            </div>
                            <div>
                                <Button type="submit" variant='outline-success' className='w-100 text-center'>Login</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </div>
            </Card>
        </Container>
    );
};

export default LoginForm;
