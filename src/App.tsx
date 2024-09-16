import React from 'react';
import { BrowserRouter as Router , Link, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Test from './pages/test';

function App() {
  return (
    <Router>
       <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/test">Test</Link>
            </li>
          </ul>
       </nav>
       <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/test' element={<Test/>}/>
       </Routes>
    </Router>
  );
}

export default App;
