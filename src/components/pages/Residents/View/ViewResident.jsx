import React, { useEffect } from 'react'
import ResidentService from '../../../service/ResidentService'

const ViewResident = (aptmntId) => {
  
    useEffect(() => {
        const fetchResident = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            
            const reqObj = {
                "username" : user.username,
                "roleName" : user.roleName,
                "aptmntId" : aptmntId
            }
            const response = await ResidentService.getResidentData(reqObj);

            console.log(response);
        };

        fetchResident();
    })
  
  return (
    <div>

    </div>
  )
}

export default ViewResident