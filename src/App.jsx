import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/pages/Login'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login/>}></Route>
    </Routes>
  )
}

export default App
