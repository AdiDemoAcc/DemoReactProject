import React, { useState } from 'react'
import { Accordion, Button, Card } from 'react-bootstrap';
import { HouseFill, List } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [ isCollapsed, setIsCollapsed ] = useState(true);
  return (
    <div style={{
        width: isCollapsed ? '80px' : '250px',
        backgroundColor: '#5a7fcf',
        height: '100vh',
        position: 'fixed',
        top: '0',
        left: '0',
        padding: '10px',
        transition: 'width 0.3s ease-in-out',
        color: 'white',
    }}>
        <Button 
            variant='light' 
            onClick={() => setIsCollapsed(!isCollapsed)} className='mb-3'
            style={{  
                width: 'auto', 
                height: 'auto', 
                borderRadius: 'auto' 
            }}    
        >
            <List size={24} style={{
                transform: isCollapsed ? 'rotate(0deg)' : 'rotate(90deg)', 
                transition: 'transform 0.3s ease-in-out'
            }} />
        </Button>
       
        {!isCollapsed ? (
             <Accordion>
                <Card >
                    <Accordion.Item eventKey={0}>
                        <Accordion.Header>Dashboard</Accordion.Header>
                        <Accordion.Body>
                            <Link to={'/dashboard'} style={{ textDecoration: 'none', color: '#333' }} >Home</Link>
                        </Accordion.Body>
                    </Accordion.Item>
                </Card>
                <Card>
                    <Accordion.Item eventKey={1}>
                        <Accordion.Header>Reports</Accordion.Header>
                        <Accordion.Body>
                            <Link to={'/dashboard'} style={{ textDecoration: 'none', color: '#333' }} >Reports</Link>
                        </Accordion.Body>
                    </Accordion.Item>
                </Card>
            </Accordion>
        ) : (
            <Accordion>
                <Button style={{ 
                        backgroundColor: '#4b6cb7', 
                        border: 'none' ,
                        width: 'auto',
                        height: 'auto'
                    }} 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <HouseFill size={25}/>
                </Button>
            </Accordion>
        )}
        
    </div>
  )
}

export default Sidebar