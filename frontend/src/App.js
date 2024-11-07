// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'; // Adjust the path if necessary
import Signup from './pages/Signup'; // Import Signup component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} /> {/* Add this line */}
            </Routes>
        </Router>
    );
}

export default App;
