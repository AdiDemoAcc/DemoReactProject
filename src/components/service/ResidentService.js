import api from "./api";

class ResidentService {

    async getAllResidents() {
        const token = localStorage.getItem("token");
        const response = await api.get("/T3000/S3001",{
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(response => response.data)
        .catch(error => {
            console.error("An error occurred: ",error);
        });
        return response;
    } 

    async getBuildingAndApartmentData() {
        const token = localStorage.getItem("token");
        const response = await api.get("/T3000/S3003",{
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(response => response.data)
        .catch(error => {
            console.error("An error occurred: ",error);
        });
        return response;
    }

    async addResidentInfoMaker(residentData) {
        const token = localStorage.getItem("token");
        const response = await api.post("/T3000/S3002",residentData,{
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(response => response.data)
        .catch(error => {
            console.error("An error occurred: ",error);
        });

        return response;
    }

    async getResidentData(reqObj) {
        const token = localStorage.getItem("token");
        const response = await api.post("/T3000/S3004",reqObj, {
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(response => response.data)
        .catch(error => {
            console.error("An error occurred: ",error);
        });

        return response;
    }

}

export default new ResidentService();