import React, { useEffect, useState } from 'react';
import { Card, Form, Container, Button, Col, InputGroup } from 'react-bootstrap';
import '../../css/Login2.css';
import { LockFill, PersonFill } from 'react-bootstrap-icons';
import LoginService from '../../service/LoginService';
import { useNavigate } from 'react-router-dom';
import logo from "../../images/logo.png";
import loginBg from "../../images/login-background.jpeg";
import AlertModal from '../../utils/AlertModal';

const LoginForm = () => {
    const [login, setLogin] = useState({
        username: '',
        password: '',
        clearSession: true,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) navigate("/dashboard", { replace: true });
    }, [navigate]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setLogin((values) => ({
            ...values,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const [alertData, setAlertData] = useState({
        show: false,
        title: "",
        message: "",
        variant: "danger",
        btnMsg: "OK",
    });

    const showAlert = (title, message, variant = "danger", btnMsg = "OK") => {
        setAlertData({ show: true, title, message, variant, btnMsg });
    };

    const handleCloseAlert = () => {
        setAlertData(prev => ({ ...prev, show: false }));

        if (alertData.title === "Success" && alertData.message === "Login Successful!") {
            navigate("/dashboard");
        }
    };

    const loginSubmitAction = async (event) => {
        event.preventDefault();
        localStorage.clear();

        try {
            const response = await LoginService.loginService(login);
            const { respObject, errorMsg, errorCd } = response;

            if (errorCd === "USER_AUTHENTICATED") {
                const user = respObject.user;
                let token = respObject.token;
                let sessionId = respObject.sessionId;
                let expiresIn = 86400;
                let expirationTime = new Date().getTime() + expiresIn * 1000;

                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("sessionId", sessionId);
                localStorage.setItem("expirationTime", expirationTime);

                const menuResponse = await LoginService.menuMapService(user.roleId);
                const { respObject: menuData, errorCd: menuErrorCd } = menuResponse;

                if (menuErrorCd === "REQUEST_SUCCESS") {
                    localStorage.setItem("menuItemList", JSON.stringify(menuData.menuItemMstList));
                    localStorage.setItem("menuList", JSON.stringify(menuData.menuMstList));
                    showAlert("Success", "Login Successful!", "success", "OK");
                } else {
                    showAlert("Menu Error", "Failed to load menu. Please try again.");
                }

            } else {
                showAlert("Login Failed", errorMsg || "Invalid credentials.");
            }
        } catch (error) {
            console.error("Login Failed: ", error);
            showAlert("Error", error?.errorMsg || "Something went wrong. Please try again later.");
        }
    };

    return (
        <Container fluid className="login-layout d-flex p-0">
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

            <Col md={6} className="p-0 d-none d-md-block overflow-hidden">
                <div className="hero-img" style={{ backgroundImage: `url(${loginBg})` }} />
            </Col>

            <AlertModal
                show={alertData.show}
                title={alertData.title}
                message={alertData.message}
                variant={alertData.variant}
                btnMsg={alertData.btnMsg}
                onClose={handleCloseAlert}
            />
        </Container>
    );
};

export default LoginForm;
