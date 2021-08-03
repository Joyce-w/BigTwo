import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import GamePlay from './GamePlay';
import LandingPg from './LandingPg';
import './App.css';

function App() {


  return (
    <>
      <BrowserRouter>
        <Route exact path="/">
          <LandingPg />          
        </Route>

        <Route exact path="/game">
          <GamePlay />             
        </Route>
     
      </BrowserRouter>

    </>
  )

  //end of class
}
export default App;
