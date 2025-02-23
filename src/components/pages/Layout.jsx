import React, { useState } from 'react'
import Sidebar from './Sidebar'
import AppNavbar from './AppNavbar'
import { Outlet } from 'react-router-dom'
import '../css/Layout.css'

const Layout = () => {

    const [isCollapsed,setIsCollapsed] = useState(true);

    return (

        <div style={{ marginLeft: '0px', width: '100%' }}>
            <AppNavbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <div style={{ display: 'flex' }}>
                <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
                <div style={{
                    marginLeft: isCollapsed ? '80px' : '250px',
                    marginTop: '56px', // Adjust for navbar height
                    transition: 'margin-left 0.3s ease-in-out',
                    padding: '20px',
                    width: '100%'
                    }}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout