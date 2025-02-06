import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const Authenticator = () => {
    const token = localStorage.getItem('token');

    let location = useLocation();

    if (token == null || !token || token.trim() == "") {
      return <Navigate to={'/'} state={{from: location }} replace={true} />
    } 

    return <Outlet />
}

export default Authenticator