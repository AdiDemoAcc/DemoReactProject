import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/pages/Login'
import Authenticator from './Authenticator'
import Dashboard from './components/pages/Dashboard'
import NewTransaction from './components/pages/NewTransaction'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route element={<Authenticator />} >
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/new-payment' element={<NewTransaction />} />
      </Route>
    </Routes>
  )
}

export default App
