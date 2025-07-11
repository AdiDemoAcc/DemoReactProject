import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Authenticator from './Authenticator'
import Dashboard from './components/pages/Dashboard'
import AddResident from './components/pages/AddResident'
import NewTransaction from './components/pages/Trasactions/NewTransactions/NewTransaction'
import DisplayResidents from './components/pages/Residents/DispayResidents/DisplayResidents'
import Login from './components/pages/Login/Login'
import ViewResident from './components/pages/Residents/ViewResident/ViewResident'
import ReconcileTxn from './components/pages/Trasactions/ReconcileTrnsctn/ReconcileTxn'
import TransactionDetails from './components/pages/Trasactions/ReconcileTrnsctn/TransactionDetails'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route element={<Authenticator />} >
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/new-payment' element={<NewTransaction />} />
        <Route path='/show-residents' element={<DisplayResidents />} />
        <Route path='/add-resident' element={<AddResident />} />
        <Route path='/view-resident/:aptmntId' element={<ViewResident />}/>
        <Route path='/reconcile-txn' element={<ReconcileTxn />} />
        <Route path='/txn-details' element={<TransactionDetails />} />
      </Route>
    </Routes>
  )
}

export default App
