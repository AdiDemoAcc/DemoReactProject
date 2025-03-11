import React, { useEffect } from 'react'
import ResidentService from '../../../service/ResidentService'
import { useParams } from 'react-router-dom'

const ViewResident = () => {

    const {aptmntId} = useParams();

    useEffect(() => {
      const token = localStorage.getItem('token');

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

        if (token && aptmntId) {
          fetchResident();
        }
    },[aptmntId])
  
  return (
    <div>

    </div>
  )
}

export default ViewResident