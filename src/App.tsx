import React from 'react';
import { BrowserRouter as Router , Link, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Test from './pages/test';
import Navbar from './components/navbar';
// import Form from './components/form'

function App() {
  return (
    <>
    <Router>
      <Navbar/>
       <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/test' element={<Test/>}/>
       </Routes>
    </Router>
    {/* <Form/> */}
    </>
  );
}

export default App;
