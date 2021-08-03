import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import GamePlay from './GamePlay';
import LandingPg from './LandingPg';
import './App.css';
import Deck from './Deck';
import CardCombos from './CardCheck';

// Context
import PlayersContext from './PlayersContext';  
import CurrentPlayersHand from './CurrentPlayersHand';

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
