import {backendUrl} from './config';

class LoginService {
    loginService(user) {
        fetch(`${backendUrl}/T1000/S1001`,user)
        .then(response => response.json())
        .then(async (response) => {
            console.log(response);
        })
    }
}

export default LoginService