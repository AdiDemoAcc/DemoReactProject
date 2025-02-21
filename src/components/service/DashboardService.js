import api from "./api";

class DashboardService{
    async dashboardTxnService() {
        try {
            const token = localStorage.getItem("token");
            const response = api.get(`/T2000/S2001`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw error.response?.data || { errorMsg : "Something went wrong!" }
        }
    }
}

export default new DashboardService();