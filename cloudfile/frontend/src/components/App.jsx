import { useState } from 'react'
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Authorization from './pages/Authorization.jsx'
import Header from './layout/Header.jsx'
import Listfiles from './forms/Listfiles.jsx'
import Registration from './pages/Registration.jsx'


function App() {
 
  return (
    <BrowserRouter>
        <Navigate/>
        <Routes>
          <Route path="/" element={<Authorization/>}/>
          <Route path="/files" element={<Listfiles/>}/>
          <Route path="/register" element={<Registration/>}/>
        </Routes>
    </BrowserRouter>
  
  )
}

export default App