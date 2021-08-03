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

  /*Start with 2 players*/
  const [players, setPlayers] = useState(2);
  const [passes, setPasses] = useState(0)
  /*Split deck of cards amongst two players */
  const [playerOne, setPlayerOne] = useState();
  const [playerTwo, setPlayerTwo] = useState();

  /**Check to see if Api is loading */
  const [isLoading, setIsLoading] = useState(true)
  /*Keep track of which player is currently playing */
  const [isPlayerOne, setIsPlayerOne] = useState(true)

  /**Keep track of the most curent play */
  const initial_play = {
    numCardsPlayed: 0, cards: []
  }

  const [currPlay, setCurrPlay] = useState(initial_play)


  /*get a deck id and then split the deck, store in state*/
  useEffect(() => {
    //set state so all player cards are stored
    const splitDeck = async () => {
      let {deck_id} = await Deck.shuffleNewCard();
      let { p1, p2 } = await Deck.splitDeck(players, deck_id)

      setPlayerOne(p1.data.cards)
      setPlayerTwo(p2.data.cards)
      //update to make sure api call is done
      setIsLoading(false)
    }
    splitDeck();
  },[])


  //update the state and current player if starting the game or a higher hand is played
  const updateCurrPlayAndPlayerState = (hand) => {
    setCurrPlay({ numCardsPlayed: hand.length, cards: hand })

    let codes = HandNewSubmission.getPlayerHand(hand)
    //update the current player's hand without the card(s) that was played
    updatePlayerHand(codes);

    //switch players
    setIsPlayerOne(!isPlayerOne)
  }
  //updates the current players hand so that the cards that were played are removed
  const updatePlayerHand =(code) =>{
    isPlayerOne ?
    setPlayerOne(playerOne.filter(cards => !code.includes(cards.code))) :
    setPlayerTwo(playerTwo.filter(cards => !code.includes(cards.code)))
  }

  //Handle changes when player passes their turn
  const handlePass = () => {
    console.log(isPlayerOne ? 'player one clicked pass' : 'player two clicked pass')
    setIsPlayerOne(!isPlayerOne)
    setPasses((passes) => isNewRound(passes + 1))

  }

  //if both players pass than goes back to the current Player and they can use new hand
  const isNewRound = (passCount) => {
    setPasses(passCount)
    //if both players passes, clear currPlay. 
    console.log(passCount)
    if ( passCount === 1) {
      console.log('RESET CARDS')
      setPasses(0)
      setCurrPlay(initial_play)
    }
  }

  //Handle palyers hand submission
  const handleNewHand = (hand) => {
    console.log(isPlayerOne ? 'PLAYER ONE SUBMITED' : 'PLAYER TWO SUBMITED')
    //check to see if the same amount of cards are played
    let isValidPlay = CardCombos.validCardPlay(currPlay.numCardsPlayed, hand.length)
    
    //if valid, check hand for correct combo
    if (isValidPlay) {

      if (hand.length === 1) {
        console.log('hit 1 card')
        console.log(hand, currPlay)

        
        //add hand if currPlay is empty
        if (currPlay.cards.length === 0) {
          updateCurrPlayAndPlayerState(hand)
        }

        //check to see if hand is higher than currPlay card
        else {
          let isHigher = CardCombos.isHigherSingle(hand, currPlay.cards)
          console.log(isHigher)

          if (isHigher) {
            updateCurrPlayAndPlayerState(hand)
            
          } else {
            setIsPlayerOne(isPlayerOne)
          }
        }
      }
    
      //check if valid pair
      else if (hand.length === 2) {
        console.log(hand)
        console.log('hit 2 card')

        /*check to see if valid 2 card play, update currPlay valid*/
        let isValid = CardCombos.isValidPair(hand);

        if (isValid) {
          //add hand if currPlay is empty
          if (currPlay.cards.length === 0) {
          console.log('hit EMPTY 2 card')
          updateCurrPlayAndPlayerState(hand)
          }
          //check to see if hand pair is higher than currPlay pair
          else {
            console.log('there is are 2 cards you need to beat')
            let isHigherPair = CardCombos.isHigherPair(hand, currPlay)
            console.log(isHigherPair)

            if (isHigherPair) {
              updateCurrPlayAndPlayerState(hand)
              
            } else {
              setIsPlayerOne(isPlayerOne)
            }
          }
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
            updateCurrPlayAndPlayerState(hand)
          }
          else {
            console.log('check to see if 5 card if valid')
            //check to see if hand's 5 card is higher than currPlay 
            let isHigherFive = CardCombos.isHigher5Card(hand, currPlay.cards)

            if (isHigherFive) {
              updateCurrPlayAndPlayerState(hand)
              
            } else {
              setIsPlayerOne(isPlayerOne)
            }
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
    <PlayersContext.Provider value={{isLoading, isPlayerOne, playerOne, playerTwo, handleNewHand, handlePass}}>
      <div className="App">

        <h1>Big Two</h1>
        <div className="Table">
          <p>Current Hand to Beat</p>
          {currPlay.cards.map(card => {
            return <img key={ card.code } alt={card.code} src={card.image}></img>
          })}
        </div>

        {/* Have player pick the number of cards to play */}
        {
          !isLoading ? <CardPickerForm/> :<p>Loading...</p>
        }
        


        {/* <GameTable/> */}
    </div>
    </PlayersContext.Provider>    
  );

  //end of class
}
export default App;
