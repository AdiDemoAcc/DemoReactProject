import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { List } from 'react-bootstrap-icons'
import '../css/AppNavbar.css'

const AppNavbar = ({ isCollapsed, setIsCollapsed }) => {

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  }

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
        </Navbar>
    </div>
  )
}

export default AppNavbar