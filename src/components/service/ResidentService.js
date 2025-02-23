import api from "./api";

class ResidentService {

    async getAllResidents() {
        const token = localStorage.getItem("token");
        const response = await api.get("/T3000/S3001",{
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        });
        return response;
    } 

}

export default new ResidentService();