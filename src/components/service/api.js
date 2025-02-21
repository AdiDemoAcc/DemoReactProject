import axios from "axios";
import { backendUrl } from "./config";


const api = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
    headers : {
        "Content-Type" : "application/json"
    }
});

export default api;