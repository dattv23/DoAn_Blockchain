import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navbar, Welcome, Footer, Services, Transactions, Login, MyWallet } from "./components";
import { fetchUser } from './utils/fetchUser';

const HomePage = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      <Welcome />
    </div>
    <Services />
    <Footer />
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/history' element={<Transactions />}></Route>
        <Route path='/mywallet' element={<MyWallet />}></Route>
      </Routes>
    </Router>
  )
}

export default App;