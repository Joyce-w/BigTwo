import React, { useEffect, useState } from 'react'
// import { Route } from 'react-router-dom';
import './App.css';
import CardPickerForm from './CardPickerForm'
import Deck from './Deck';
import CardCombos from './CardCheck';
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

  /**Check to see if Api is loading */
  const [isLoading, setIsLoading] = useState(false)
  /*Keep track of which player is currently playing */
  const [isPlayerOne, setIsPlayerOne] = useState(true)
  /**Keep track of the most curent play */
  const initial_play = { numCardsPlayed: 0, cards: [], placeholder: "https://p.kindpng.com/picc/s/8-89401_ace-playing-card-png-ace-playing-cards-png.png"}
  const [currPlay, setCurrPlay] = useState(initial_play)

  //get new deck from API, store deckID in state;
  useEffect(() => {
    const newDeck = async() => {
      let {deck_id} = await Deck.shuffleNewCard();
      setDeckID(deck_id);
    }
    newDeck();
  },[])
  
  /*split deck when a new deckID is obtained, store in state*/
  useEffect(() => {
    //set state so all player cards are stored
    const splitDeck = async () => {
      let {p1, p2} = await Deck.splitDeck(players, deckID)
      setPlayerOne(p1.data.cards)
      setPlayerTwo(p2.data.cards)
    }
    splitDeck();
    setIsLoading(false)
  },[deckID])

  /**update currPlay */
  const updatecurrPlay = (hand) => {

  }

  //Handle palyers hand submission
  const handleNewHand = (hand) => {
    //check to see if the cards played are valid, 
    let isValidPlay = CardCombos.validCardPlay(currPlay.numCardsPlayed, hand.length)
    //if valid, check hand for correct combo
    if (isValidPlay) {
      //check if valid pair
      if (hand.length === 2) {
        let isValid = CardCombos.isValidPair(hand);
        return isValid;
      }
      //check for valid five-card      
      else if (hand.length === 5) {
        console.log(CardCombos.isValidFiveCard(hand))
      }

    } else {
    //if not, pick cards again  
      console.log('Invalid play! Cards must match current play')
    }




    //check prev hand to see who is higher
  }

  return (
    <PlayersContext.Provider value={{isLoading, isPlayerOne, playerOne, playerTwo}}>
      <div className="App">

        <h1>Big Two</h1>
        <div className="Table">
          <p>This is the game table</p>
          {<img alt="placeholder for current play" src={currPlay.placeholder}></img>}
        </div>

        {/* Have player pick the number of cards to play */}
        <CardPickerForm handleNewHand={ handleNewHand }/>


        {/* <GameTable/> */}
    </div>
    </PlayersContext.Provider>    
  );
}

export default App;
