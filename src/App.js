import React, { useEffect, useState } from 'react'
// import { Route } from 'react-router-dom';
import './App.css';
import CardPickerForm from './CardPickerForm'
import Deck from './Deck';
import CardCombos from './CardCheck';
import HandNewSubmission from './HandleNewHandSubmission';

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
  const initial_play = {
    numCardsPlayed: 0, cards: [
    ],
    placeholder: "https://p.kindpng.com/picc/s/8-89401_ace-playing-card-png-ace-playing-cards-png.png"
  }

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

  //Handle palyers hand submission
  const handleNewHand = (hand) => {
    //check to see if the same amount of cards are played
    let isValidPlay = CardCombos.validCardPlay(currPlay.numCardsPlayed, hand.length)
    
    //if valid, check hand for correct combo
    if (isValidPlay) {

      //set current player
      // isPlayerOne ? playerOne : playerTwo

      if (hand.length === 1) {
        console.log('hit 1 card')
        //add hand if currPlay is empty
        if (currPlay.cards.length === 0) {
          setCurrPlay({ numCardsPlayed: hand.length, cards: hand })
        
          let codes = HandNewSubmission.updatePlayerHand(hand)
          let newHand = playerOne.filter(cards => !codes.includes(cards.code))
          console.log(newHand)
          // let newHand = isPlayerOne ?
          //   playerOne.filter(cards => !codes.includes(cards.code))
        }
        //check to see if hand is higher than currPlay card
        else {
          let isHigher = CardCombos.isHigherSingle(hand, currPlay.cards)
          console.log(isHigher)
          if (isHigher) {
            setCurrPlay({ numCardsPlayed: hand.length, cards: hand })
          } else {
            alert('current card is not higher than hand to beat')
          }
        }
      }
    
      //check if valid pair
      else if (hand.length === 2) {
        console.log('hit 2 card')
        /*check to see if valid 2 card play, update currPlay valid*/
        let isValid = CardCombos.isValidPair(hand);
        if (isValid) {
          //add hand if currPlay is empty
          if (currPlay.cards.length === 0) {
            console.log('hit EMPTY 2 card')
            setCurrPlay({ numCardsPlayed: hand.length, cards: hand })
            console.log(HandNewSubmission.updatePlayerHand(hand))
          }
          //check to see if hand pair is higher than currPlay pair
          else {
            console.log('there is are 2 cards you need to beat')
            let isHigherPair = CardCombos.isHigherPair(hand, currPlay)
            console.log(isHigherPair)
            if (!isHigherPair) {
              alert('Your hand is not higher than the cards to beat!')
              //make logic to select again if card is not higher
              return;
            } else {
              setCurrPlay({ numCardsPlayed: hand.length, cards: hand })
            }
          }
        }
        else {
          alert('invalid 2 pair!')
        }
      }
         
      /*check for valid five-card, update currPlay valid*/
      else if (hand.length === 5) {
        let isValid = CardCombos.isValidFiveCard(hand)
        console.log('this is the 5 card logic')
        if (isValid) {
          //add hand if currPlay is empty
          if (currPlay.cards.length === 0) {
            console.log('hit EMPTY 5 card')
            setCurrPlay({ numCardsPlayed: hand.length, cards: hand })
            console.log(HandNewSubmission.updatePlayerHand(hand))
          }
          else {
            console.log('check to see if 5 card if valid')
            //check to see if hand's 5 card is higher than currPlay 
            let res = CardCombos.isHigher5Card(hand, currPlay.cards)
            return res ? setCurrPlay({ numCardsPlayed: hand.length, cards: hand }) : console.log('not high enough')
          }

        }
      }
      //Invalid hand, pick again!
      alert('Invalid hand, pick again!')
      return;

      // End of isValidPlay()
    }
  }


  return (
    <PlayersContext.Provider value={{isLoading, isPlayerOne, playerOne, playerTwo}}>
      <div className="App">

        <h1>Big Two</h1>
        <div className="Table">
          <p>Current Hand to Beat</p>
          {currPlay.cards.map(card => {
            return <img key={ card.code } alt={card.code} src={card.image}></img>
          })}
        </div>

        {/* Have player pick the number of cards to play */}
        <CardPickerForm handleNewHand={ handleNewHand }/>


        {/* <GameTable/> */}
    </div>
    </PlayersContext.Provider>    
  );

  //end of class
}
export default App;
