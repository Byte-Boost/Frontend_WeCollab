import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from '../components/navbar';
import Login from './login';
import Home from './home';
import Register from './register';

function App(){
  const location = useLocation();
  const noNavBarArray = [
    '/',
    '',
  ]
  return (
    <>
        {noNavBarArray.indexOf(location.pathname) < 0 && <Navbar/>}
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='*' element={<h1>Not Found</h1>}/>
        </Routes>
    </>
  );
}

export default App;
