import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'


const AppNavbar = () => {
  return (
    <div>
        <Navbar expand="lg" style={{ backgroundColor:  "#4b6cb7", color: 'white' }} variant='dark' >
            <Container>
                <Navbar.Brand href='/dashnoard' style={{color: 'white', fontWeight: 'bold' }}>Ledgerly</Navbar.Brand>
            </Container>
        </Navbar>
    </div>
  )
}

export default AppNavbar