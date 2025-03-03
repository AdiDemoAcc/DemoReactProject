import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Layout from './components/pages/Layout';
import LoginService from './components/service/LoginService';

const Authenticator = () => {
    const [isSessionValid, setIsSessionValid] = useState(true);
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem("expirationTime");
    let location = useLocation();
    let currentTime = new Date().getTime();

    useEffect(() => {

        // token = localStorage.getItem('token');
        // expirationTime = localStorage.getItem("expirationTime");

        const checkUserSession = async () => {
            try {
                const response = await LoginService.checkUserSession();

                const { respObject, errorCd } = response;
                
                if (respObject === false || errorCd !== "REQUEST_SUCCESS") {
                    throw new Error("Invalid session");
                }
            } catch (error) {
                console.error("Session check failed:", error);
                setIsSessionValid(false);
            }
        };

        if (token && expirationTime && currentTime <= expirationTime) {
            checkUserSession();
        } else {
            setIsSessionValid(false);
        }
    }, [token, expirationTime]);

    if (!isSessionValid) {
        alert("Session expired. Please login again.");
        localStorage.clear();
        return <Navigate to={'/'} state={{ from: location }} replace={true} />;
    }

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default Authenticator;
