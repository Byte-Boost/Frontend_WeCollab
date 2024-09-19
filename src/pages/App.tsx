import React from 'react';
import { BrowserRouter as Router , Link, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './home';
import Test from './test';
import Navbar from '../components/navbar';
// import Form from './components/form'


function App(){
  const location = useLocation();
  const noNavBarArray = [
    '/',
    '/example',
  ]
  return (
    <>
        {noNavBarArray.indexOf(location.pathname) < 0 && <Navbar/>}
       <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/test' element={<Test/>}/>
       </Routes>
    {/* <Form/> */}
    </>
  );
}

export default App;
