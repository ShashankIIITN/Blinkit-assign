import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import UploadImage from './components/Upload';
import Home from './components/Home.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route  path="/" element={<Home/>} />
          <Route  path="/signup" element={<SignUp/>} />
          <Route  path="/login" element={<Login/>} />
          <Route  path="/upload" element={<UploadImage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;