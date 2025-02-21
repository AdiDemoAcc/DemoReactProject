import api from "./api";


class TransactionService {

    async getTxnMstData() {
        try {
            const token = localStorage.getItem("token");
            const response = api.get(`/T8000/S8004`,
                {
                    headers: {
                        "Authorization" : `Bearer ${token}`,
                        "Content-Type" : "application/json"
                    }
                }
            );
            return response;
        } catch (error) {
            throw error.response?.data || { errorMsg : "Something went wrong!" }
        }
    }

}

export default new TransactionService();