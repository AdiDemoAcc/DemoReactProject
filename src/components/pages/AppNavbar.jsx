import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { List } from 'react-bootstrap-icons'
import '../css/AppNavbar.css'
import LoginService from '../service/LoginService'
import { replace, useNavigate } from 'react-router-dom'

const AppNavbar = ({ isCollapsed, setIsCollapsed }) => {

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.username;
  const token = localStorage.getItem("token");
  let sessionId = localStorage.getItem("sessionId");

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  }

  const navigate = useNavigate();

  const logoutUser = async (event) => {
    event.preventDefault();
    
    try {
        const response = await LoginService.logoutUser(username,sessionId);
        localStorage.removeItem("token");
        if (response.errorCd === "LOGOUT_SUCCESS") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("menuItemList");
            localStorage.removeItem("menuList");
            navigate("/", { replace: true });
        } else {
            alert("Logout failed: " + response.errorMsg);
        }
    } catch (error) {
        console.error("Logout error:", error);
        alert("Something went wrong. Please login again.");
        navigate("/", { replace : true });
    }
};


  return (
    <div className='custom-appnavbar-container'>
        <Navbar expand="lg" style={{ backgroundColor:  "#4b6cb7", color: 'white' }} variant='dark' >
              <Button
                variant='light'
                onClick={toggleSidebar}
                style={{ marginRight: '10px', marginLeft: '15px' }}
              >
                <List size={24} style={{
                    transform: isCollapsed ? 'rotate(0deg)' : 'rotate(90deg)',
                    transition: 'transform 0.3s ease-in-out'
                  }} 
                />
              </Button>
            <Container>  
                <Navbar.Brand href='/dashnoard' style={{color: 'white', fontWeight: 'bold' }}>Ledgerly</Navbar.Brand>
            </Container>
            <Button id='customNavbarLogoutButton' className='me-2 custom-navbar-logout-button' onClick={(e) => logoutUser(e)}>Logout</Button>
        </Navbar>
    </div>
  )
}

export default AppNavbar