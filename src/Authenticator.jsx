import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Layout from './components/pages/Layout';

const Authenticator = () => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem("expirationTime");
    let location = useLocation();
    let currentTime = new Date().getTime();
    if (token == null || !token || token.trim() == "" || (currentTime > expirationTime)) {
      alert("Session expired. Please login again.");
      localStorage.clear();
      return <Navigate to={'/'} state={{from: location }} replace={true} />
    } 

    return (
      <Layout>
        <Outlet />
      </Layout>
    );
}

export default Authenticator