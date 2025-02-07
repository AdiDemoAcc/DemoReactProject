import React from 'react'
import Sidebar from './Sidebar'
import AppNavbar from './AppNavbar'
import { Outlet } from 'react-router-dom'
import '../css/Sidebar.css'

const Layout = () => {
    return (

        <div style={{ marginLeft: '0px', width: '100%' }}>
            <AppNavbar />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ marginLeft: '0px' }}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout