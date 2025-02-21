import React, { useEffect, useState } from 'react'
import TransactionService from '../service/TransactionService';

const NewTransaction = () => {

    const [ mstData, setMstData ] = useState([]);

    useEffect(() => {
        TransactionService.getTxnMstData()
            .then(response => response.data)
            .then(response => {
                console.log(response);
            })
    },[])

  return (
    <div>New Transaction Page</div>
  )
}

export default NewTransaction