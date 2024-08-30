import { useState } from 'react'
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Authorization from './forms/Authorization.jsx'
import Header from './layout/Header.jsx'


function App() {
 
  return (
    <BrowserRouter>
        <Navigate/>
        <Routes>
          <Route path="/" element={<Authorization/>}/>
          <Route path="/files" element={<Header/>}/>
        </Routes>
    </BrowserRouter>
  
  )
}

export default App