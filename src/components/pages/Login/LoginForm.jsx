import React, { useEffect, useState } from 'react';
import { Card, Form, Container, Button, Row, Col, InputGroup } from 'react-bootstrap';
import '../../css/Login2.css';
import { LockFill, PersonFill } from 'react-bootstrap-icons';
import LoginService from '../../service/LoginService';
import { useNavigate } from 'react-router-dom';
import logo from "../../images/logo.png";
import loginBg from "../../images/login-background.jpeg";

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
                let expirationTime = new Date().getTime() + expiresIn * 1000;

                // Store user session data
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("sessionId", sessionId);
                localStorage.setItem("expirationTime", expirationTime);
                const menuResponse = await LoginService.menuMapService(roleId);
                const { respObject: menuData, errorMsg: menuErrorMsg, errorCd: menuErrorCd } = menuResponse;
                console.log("Menu Response: ", menuData);

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
        <Container fluid className="login-layout d-flex p-0">
            {/* Left panel */}
            <Col md={6} className="left-panel d-flex align-items-center justify-content-center">
                <Card className="login-card glass">
                    <Card.Header className="border-0 bg-transparent text-center">
                        <img src={logo} alt="Ledgerly logo" className="login-logo" />
                    </Card.Header>

                    <Card.Body>
                        <Form onSubmit={loginSubmitAction}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text><PersonFill /></InputGroup.Text>
                                <Form.Control
                                    name="username"
                                    value={login.username}
                                    onChange={handleChange}
                                    placeholder="Username"
                                    required
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text><LockFill /></InputGroup.Text>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={login.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    required
                                />
                            </InputGroup>

                            <Form.Check
                                type="checkbox"
                                name="clearSession"
                                checked={login.clearSession}
                                onChange={handleChange}
                                label="Clear last session"
                                className="mb-3"
                            />

                            <Button type="submit" variant="success" className="w-100">
                                Login
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>

            {/* Right hero image (hidden < md) */}
            <Col md={6} className="p-0 d-none d-md-block overflow-hidden">
                <div className="hero-img" />
            </Col>
        </Container>
    );
};

export default LoginForm;
