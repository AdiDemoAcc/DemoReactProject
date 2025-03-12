import axios from "axios";
import { backendUrl } from "./config";


const api = axios.create({
    baseURL: `${backendUrl}/ldgr`,
    withCredentials: true,
    headers : {
        "Content-Type" : "application/json"
    }
});

export default api;