import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import './GamePlay.css';
import Deck from './Deck';
import CardCombos from './CardCheck';
import Alert from './Alerts'
import CurrentPlayersHand from './CurrentPlayersHand';
// Context
import PlayersContext from './PlayersContext';  


function GamePlay() {

  const [passes, setPasses] = useState(0)
  /*Split deck of cards amongst two players */
  const [playerOne, setPlayerOne] = useState();
  const [playerTwo, setPlayerTwo] = useState();

  /**Check to see if Api is loading */
  const [isLoading, setIsLoading] = useState(true)
  /*Keep track of which player is currently playing */
  const [isPlayerOne, setIsPlayerOne] = useState(true)
  //check for winner
  const [isWinner, setIsWinner] = useState(false)
  /**Keep track of the most curent play */
  const initial_play = {
    numCardsPlayed: 0, cards: []
  }
  const [currPlay, setCurrPlay] = useState(initial_play)
  const [alert, setAlert] = useState(null)

  /*get a deck id and then split the deck, store in state*/
  useEffect(() => {
    //set state so all player cards are stored
    const splitDeck = async () => {
      let {deck_id} = await Deck.shuffleNewCard();
      let { p1, p2 } = await Deck.splitDeck(2, deck_id)

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

    let codes = getPlayerHand(hand)
    //update the current player's hand without the card(s) that was played
    updatePlayerHand(codes);

    //switch players
    setIsPlayerOne(!isPlayerOne)
    
  }

  //check for winner
  const checkForWin=(player,code) =>{
    let cardsRemaining = player.filter(cards => !code.includes(cards.code)).length
    
    if (cardsRemaining === 0) {
      setIsWinner((isWinner)=>!isWinner)
    }
  }

  //updates the current players hand so that the cards that were played are removed
  const updatePlayerHand = (code) => {
    //check for win
    isPlayerOne ?
    checkForWin(playerOne, code):
    checkForWin(playerTwo, code)
    
    //update player's hand
    isPlayerOne ?
    setPlayerOne(playerOne.filter(cards => !code.includes(cards.code))) :
    setPlayerTwo(playerTwo.filter(cards => !code.includes(cards.code)))
  }

    //Updates the player's hand in the state
    const getPlayerHand = (hand) => {
        let codes = hand.map(card => card.code)
        return codes
    } 

  //Handle changes when player passes their turn
  const handlePass = () => {
    setIsPlayerOne(!isPlayerOne)
    setPasses((passes) => isNewRound(passes + 1))
    
  }

  //if both players pass than goes back to the current Player and they can use new hand
  const isNewRound = (passCount) => {
    setPasses(passCount)
    //if both players passes, clear currPlay. 
    if ( passCount === 1) {
      setPasses(0)
      setCurrPlay(initial_play)
    }
  }

  //Handle palyers hand submission
  const handleNewHand = (hand) => {
    setAlert(null)
    //check to see if the same amount of cards are played
    let isValidPlay = CardCombos.validCardPlay(currPlay.numCardsPlayed, hand.length)
  
    //if valid, check hand for correct combo
    if (isValidPlay) {

      if (hand.length === 1) {
        //add hand if currPlay is empty
        if (currPlay.cards.length === 0) {
          updateCurrPlayAndPlayerState(hand)
          setAlert(null)
        }
        //check to see if hand is higher than currPlay card
        else {
          let isHigher = CardCombos.isHigherSingle(hand, currPlay.cards)
          if (isHigher) {
            updateCurrPlayAndPlayerState(hand)
            setAlert(null)
          } else {
            setAlert(() => 'Your card must be higher in value, or higher in suit if the values are equal!')
            setIsPlayerOne(isPlayerOne)
          }
        }
      }
    
      //check if valid pair
      else if (hand.length === 2) {
        /*check to see if valid 2 card play, update currPlay valid*/
        let isValid = CardCombos.isValidPair(hand);

        if (isValid) {
          //add hand if currPlay is empty
          if (currPlay.cards.length === 0) {
            updateCurrPlayAndPlayerState(hand)
            setAlert(null)
          }
          //check to see if hand pair is higher than currPlay pair
          else {
            let isHigherPair = CardCombos.isHigherPair(hand, currPlay)

            if (isHigherPair) {
              updateCurrPlayAndPlayerState(hand)
              setAlert(null)
              
            } else {
              console.log('not higher')
              setAlert(() =>'Your card value must be higher! If values are the same, your highest suit must be higher than their highest suit')
              setIsPlayerOne(isPlayerOne)
            }
          }
        }
        else {
        setAlert(() => 'Values on the card must be the same to be a pair!')          
        }

      }
         
      /*check for valid five-card, update currPlay valid*/
      else if (hand.length === 5) {
        let isValid = CardCombos.isValidFiveCard(hand)

        if (isValid) {
          //add hand if currPlay is empty
          if (currPlay.cards.length === 0) {
            updateCurrPlayAndPlayerState(hand)
            setAlert(null)
          }
          else {
            //check to see if hand's 5 card is higher than currPlay 
            let isHigherFive = CardCombos.isHigher5Card(hand, currPlay.cards)

            if (isHigherFive) {
              updateCurrPlayAndPlayerState(hand)
              setAlert(null)
              
            } else {
              setAlert(() => 'Your hand is not higher than the current. Try again!')
              setIsPlayerOne(isPlayerOne)
            }
          }
        }
        else {
          setAlert(() => 'Invalid hand! Must be any of the follow: three of a kind, straight, flush, full House, four of a kind, or straight flush.')  
        }
      }

      // End of isValidPlay()
    }

    setIsPlayerOne(isPlayerOne)
    
  }

  //reload the page to reset game
  const handleReset = () => {
    window.location.reload();
  }

  return (
    <PlayersContext.Provider value={{isLoading, isPlayerOne, playerOne, playerTwo, handleNewHand, handlePass}}>
      <div className="App">

        
        {/* display restart button if won */}
        {isWinner ?
          <>
            <h3>We have a winner!</h3>
            <button onClick={ handleReset } className="App-btn">Play Again?</button>
          </>
          : 
          <>
            {/* Display game if  there is no current winner*/}
            <h1>{isPlayerOne ? <b>Player Ones Turn</b> : <b>Player Twos Turn</b>}</h1>
            <div className="App-CurrentHand">
              
              {/* Instructions when the there are no cards */}
              {currPlay.numCardsPlayed === 0 ?
                <h4>Pick a single, pair, or poker hand to play!</h4> :
                <h4>Current Hand to Beat</h4>
              }              

              {/* Display the current valid hand played */}
              {currPlay.cards.map(card => {
                return <img className="App-cards" key={card.code} alt={card.code} src={card.image}></img>
                })
              }
              {/* Display any error messages */}
              {alert ? <h4>{alert}</h4> : null}
              
            </div>

            {/* Have player pick the number of cards to play */}
            {
              !isLoading ? <CurrentPlayersHand/> :<p>Loading...</p>
            }          
          </>
        }


        
    </div>
    </PlayersContext.Provider>    
  );

  //end of class
}
export default GamePlay;
