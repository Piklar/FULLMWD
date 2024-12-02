import { Container } from 'react-bootstrap';
import './App.css';
import { BrowserRouter as Router,  Routes, Route } from "react-router-dom";


import AppNavbar from './components/AppNavbar';
import Banner from './pages/Banner';
import CourseCard from './components/CourseCard';
import Register from './pages/Register';
import Login from './pages/Login'
import Logout from './pages/Logout'
import ErrorPage from './pages/ErrorPage';
import { useState } from 'react';
import { UserProvider } from './UserContext';
function App() {

  const [user, setUser] = useState({
    token: localStorage.getItem("token")
  })

const unsetUser = () => {
  localStorage.clear();
}

  return (
    <>
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <Container fluid>
          <AppNavbar/>
            <Routes>
              <Route path='/' element={<Banner/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/courses' element={<CourseCard/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/logout' element={<Logout/>}/>
              <Route path='*' element={<ErrorPage/>}/>
            </Routes>
        </Container>
      </Router>
    </UserProvider>
    </>
  );
}

export default App;