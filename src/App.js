import React, { useEffect, useState } from 'react'
// import { Route } from 'react-router-dom';
import './App.css';
import GameTable from './GameTable';
import BigTwo from './game';
// Context
import PlayersContext from './PlayersContext';  

function App() {
  /*Save deckID */
  const [deckID, setDeckID] = useState();
  /*Start with 2 players*/
  const [players, setPlayers] = useState(2);
  /*Split deck of cards amongst two players */
  const [playerOne, setPlayerOne] = useState();
  const [playerTwo, setPlayerTwo] = useState();
  /*Keep track of which player is currently playing */
  const [isPlayerOne, setIsPlayerOne] = useState(true)
  /**Keep track of the most curent play */
  const initial_play = { numCardsPlayed: 0, cards: []}
  const [currPlay, setCurrPlay] = useState(initial_play)

  //get new deck from API, store deckID in state;
  useEffect(() => {
    const newDeck = async() => {
      let {deck_id} = await BigTwo.shuffleNewCard();
      setDeckID(deck_id);
    }
    newDeck();
  },[])
  
  /*split deck when a new deckID is obtained, store in state*/
  useEffect(() => {
    //set state so all player cards are stored
    const splitDeck = async () => {
      let {p1, p2} = await BigTwo.splitDeck(players, deckID)
      setPlayerOne(p1.data.cards)
      setPlayerTwo(p2.data.cards)
    }
    
    splitDeck();
    ;
  },[deckID])

  //set state to show current player
  //set state to show currentPlay

  
  return (
    <PlayersContext.Provider value={{isPlayerOne, playerOne, playerTwo}}>
      <div className="App">
        <h1>BigTwo</h1>
          <GameTable/>
    </div>
    </PlayersContext.Provider>    
  );
}

export default App;
