import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import EmployeesPage from './pages/Employees';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dictionary from './pages/dictionary';
import Definition from './pages/Definition';
import NotFound from './components/NotFound';
import Customers from './pages/customers';
import Customer from './pages/customer';
import Login from './pages/login';
import { baseurl } from './shared';
import axios from 'axios';
import Register from './pages/register';

export const LoginContext = createContext();




function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);
  const minute = 1000 * 60

  function refreshToken() {
    if (localStorage.refresh) {
      const url = baseurl + 'api/token/refresh/';
      return axios.post(url, { refresh: localStorage.refresh })
        .then(response => {
          localStorage.access = response.data.access;
          localStorage.refresh = response.data.refresh;
          setLoggedIn(true);
        })
        .catch(error => {
          // Handle the error if needed
        });
    }
  }
  useEffect(() => {
    const interval = setInterval(refreshToken, minute * 4);
    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);



  function changedLoggedIn(value) {
    setLoggedIn(value);
    if (value === false) {
      localStorage.clear('access', 'refresh')
    }
  }


  return (
    <LoginContext.Provider value={[loggedIn, changedLoggedIn]}>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/dictionary/:search" element={<Definition />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<Customer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Header>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
