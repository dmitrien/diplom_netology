import { useState } from 'react'
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Authorization from './forms/Authorization.jsx'
import Header from './layout/Header.jsx'
import Registration from './forms/Registration.jsx'


function App() {
 
  return (
    <BrowserRouter>
        <Navigate/>
        <Routes>
          <Route path="/" element={<Authorization/>}/>
          <Route path="/files" element={<Header/>}/>
          <Route path="/register" element={<Registration/>}/>
        </Routes>
    </BrowserRouter>
  
  )
}

export default App