import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navbar, Welcome, Footer, Services, Transactions, Login } from "./components";
import { fetchUser } from './utils/fetchUser'

const HomePage = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      <Welcome />
    </div>
    <Services />
    <Transactions />
    <Footer />
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/Login' element={<Login />}></Route>
      </Routes>
    </Router>
  )
}

export default App;