import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component }  from 'react';

import Button from 'react-bootstrap/Button';
import Navbarc from './components/Navbarf/Navbarc';
import FearGreedc from './components/FearGreedf/FearGreedc';
import Trendingc from './components/Trendingf/Trendingc';
import Cryptoc from './components/Cryptof/Cryptoc';
import Newsc from './components/Newsf/Newsc';
import Coinpagec from './components/Coinpagef/Coinpagec';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">


      <div>
        <Navbarc />
        <Trendingc />
        <Routes>
        <Route path="/" element={<Cryptoc/>}  />
        <Route exact path="/news" element={ <Newsc/>} />
        <Route exact path="/fear" element={ <FearGreedc/>} />
        <Route path="/coins/:id"  element={ <Coinpagec/>} exact />
        </Routes>
      </div>




    </div>
  );
}

export default App;
