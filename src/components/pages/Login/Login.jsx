import React, { useEffect, useState } from 'react'
import LoginService from '../../service/LoginService';
import LoginForm from './LoginForm';
import errorImg from '../../images/image1.png';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [isConnected, setIsConnected] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const checkBackendStatus = async () => {
            try {
                const response = await LoginService.checkBackend();
                if (response.data.status === "UP") {
                    setIsConnected(true);
                } else {
                    setIsConnected(false);
                }
            } catch (error) {
                console.error(error);
                setIsConnected(false);
            }
        }

        checkBackendStatus();
    }, [])

    const handleGoBack = (event) => {
        event.preventDefault();
        console.log("Button clicked! Refreshing...");
        window.location.reload(); 
    }

    if (isConnected === null) {
        return <div>Checking Server connection......</div>
    }

    return (
        <div>
            {isConnected != null && isConnected ? (
                <LoginForm />
            ) : (
                <div className='' style={{ marginTop: '10%', marginLeft: '20%', position: 'relative', display: 'inline-block' }}>
                    <div className='d-flex justify-content-center align-items-center'>
                        <img 
                            src={errorImg} alt='...' 
                            style={{
                                width: '50vw',
                                height: '40vh'
                            }}
                        />
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <Button 
                            variant='outline-dark' 
                            onClick={(e)=> handleGoBack(e)} 
                            // style={{
                            //     position: 'absolute',
                            //     bottom: '10%', // Adjust vertical positioning inside the image
                            //     left: '50%',
                            //     transform: 'translateX(-50%)',
                            //     padding: '10px 20px',
                            //     fontSize: '16px',
                            // }}
                        >
                            Refresh
                        </Button>
                    </div>
                </div>

            )}
        </div>
    )
}

export default Login