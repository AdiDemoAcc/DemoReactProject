import api from './api';



class LoginService {
    async loginService(user) {
       try {
        const response = await api.post(`/T1000/S1001`,user);
        return response.data;
       } catch (error) {
        throw error.response?.data || { errorMsg: 'Login Failed' };
       }
    }

    async menuMapService(roleId) {
        try {
            const token = localStorage.getItem("token");
            const response = await api.post(
                `/T1000/S1003`,
                roleId,
                {
                    headers: {
                        Authorization : `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error in service: ",error);
            throw error;
        }
    }

    async logoutUser(username,sessionId) {
        try {
            const token = localStorage.getItem("token");
            const response = await api.post(`/T1000/S1002`,
                { username,sessionId },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error during logout:", error);
            throw error.response?.data || { errorMsg: "Logout failed" };
        }
    }
    
}

export default new LoginService();