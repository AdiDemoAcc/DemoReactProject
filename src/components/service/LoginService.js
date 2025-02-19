import {backendUrl} from './config';
import axios from 'axios';

class LoginService {
    async loginService(user) {
       try {
        const response = await axios.post(`${backendUrl}/T1000/S1001`,user);
        return response.data;
       } catch (error) {
        throw error.response?.data || { errorMsg: 'Login Failed' };
       }
    }

    async menuMapService(roleId,token) {
        try {
            const response = await axios.post(
                `${backendUrl}/T1000/S1003`,
                roleId,
                {
                    headers: {
                        Authorization : `Bearer ${token}`,
                        "Content-Type" : "application/json"
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error in service: ",error);
            throw error;
        }
    }
}

export default new LoginService();