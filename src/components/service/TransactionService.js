import api from "./api";


class TransactionService {

    async getTxnMstData() {
        try {
            const token = localStorage.getItem("token");
            const response = api.get(`/T8000/S8004`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            )
                .then(response => response.data)
                .catch((error) => {
                    console.error("An error occurred: ", error);
                });
            return response;
        } catch (error) {
            throw error.response?.data || { errorMsg: "Something went wrong!" }
        }
    }

    async getTxnGlAccntList() {
        try {
            const token = localStorage.getItem("token");
            const response = await api.get("/T8000/S8007",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                }
            )
                .then(response => response.data)
                .catch((error) => {
                    console.error("An error occurred: ", error);
                });
            return response;
        } catch (error) {
            throw error.response?.data || { errorMsg: "Something went wrong!" }
        }
    }

    async getUnAuthTxnList() {
        try {
            const token = localStorage.getItem("token");
            const response = await api.get("/T8000/S8003",
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            )
                .then(response => response.data)
                .catch(error => {
                    console.error(error);

                });
            return response;
        } catch (error) {
            throw error.response?.data || { errorMsg: "Something went wrong" };
        }
    }

    async createNewTrasaction(transaction) {
        try {
            const token = localStorage.getItem("token");
            const response = api.post("/T8000/S8001", transaction,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                }
            )
                .then(response => response.data)
                .catch(error => {
                    console.error("An error occurred: ", error);
                });
            return response;
        } catch (error) {
            throw error.response?.data || { errorMsg: "Something went wrong" };
        }
    }

    async getTransactionFromTransactionId(transactionId) {
        try {
            const token = localStorage.getItem("token");
            const response = api.post("/T8000/S8008", { "transactionId": transactionId },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
                .then(response => response.data)
                .catch(error => {
                    console.error("An error occurred: ", error);
                })
            return response;
        } catch (error) {
            throw error.response?.data || { errorMsg: "Something went wrong" };
        }

    }

    async authorizeTransaction(transaction) {
        try {
            const token = localStorage.getItem("token");
            const response = api.post("")
        } catch (error) {

        }
    }

    async authorizeTransaction(transactionAuthor) {
        try {
            const token = localStorage.getItem("token");

            // Await the axios POST request to make sure the response is received before proceeding
            const response = await api.post("/T8000/S8002", transactionAuthor, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Return the response data
            return response.data;
        } catch (error) {
            // Catch any errors and log them
            console.error("An error occurred while authorizing transaction:", error);
            throw new Error("No response from server");
        }
    }
    
   


}

export default new TransactionService();