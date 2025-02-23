import React, { useEffect } from 'react'
import ResidentService from '../service/ResidentService'

const DisplayResidents = () => {

    useEffect(() => {
        const response = ResidentService.getAllResidents().then(resp => resp.data);

        console.log("Response: ",response);
        

    })

  return (
    <div>DisplayResidents</div>
  )
}

export default DisplayResidents