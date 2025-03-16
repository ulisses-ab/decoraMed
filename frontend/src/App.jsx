import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Dashboard from './Dashboard';
import Study from './Study';
import Register from './Register'
import Verify from './Verify';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/study/:id" element={<Study />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/verify/:token" element={<Verify />}/>
      </Routes>
    </Router>
  );
};

export default App;