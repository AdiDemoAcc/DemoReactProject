import {backendUrl} from './config';

class LoginService {
    loginService(user) {
       return fetch(`${backendUrl}/T1000/S1001`,user);
    }
}

export default LoginService