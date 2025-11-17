import { generateHeader } from "../utils/apiHeader";
import api from "./api";

class ReportService {

         async generateMonthlyReport(reqObj) {
                  try {
                           const request  = {
                                        "header" : generateHeader(),
                                        "data" : reqObj     
                                    }
                                    
                           console.log("request object : ",request);
                           
                           const token = localStorage.getItem("token");
                           const response = await api.post("/T4000/S4001",
                                    request,
                                    {
                                             headers: {
                                                      Authorization: `Bearer ${token}`,
                                                      
                                             },
                                             responseType: "blob" 
                                    }

                           )
                           return response.data;
                  } catch (error) {
                           console.log("Service Error: ",error);
                           
                  }
         }

}

export default new ReportService();