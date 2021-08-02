import React, { useState, useContext, useEffect } from 'react';
import'./CardPickerForm.css';
import PlayersContext from './PlayersContext';

const CardPickerForm = ({handleNewHand}) => {
    // get player cards
    const {isPlayerOne, playerOne, playerTwo } = useContext(PlayersContext)

  const [cardLength, setCardLength] = useState(2)
  
  const [player, setPlayer] = useState(isPlayerOne ? playerOne : playerTwo)

    // manage state of each possible card selected

    //return array of t/f depending on player's card length
  const [checkedState, setCheckedState] = useState(new Array(player.length).fill(false));

  // useEffect(() => {
  //     console.log('player is determiend')
  //     console.log(player)
  //     setCheckedState(new Array(isPlayerOne ? playerOne.length : playerTwo.length).fill(false))
      
  //   },[player])
  
    //updates player when isPlayerone is toggled
    useEffect(() => {
        setPlayer(isPlayerOne ? playerOne : playerTwo)
        console.log(isPlayerOne ? 'player one currently' : 'player two currently')
        setCurrSelection([])
    },[isPlayerOne])
  
    // handle logic when a card is selected
    const [currSelection, setCurrSelection] = useState([])

    //handle state when player picks cards
    const handleChange = (card, index) => {
        //check if the card is 'checkboxed' in state, toggle on clicks
        let isCardChecked = checkedState.map((card, idx) =>
            idx === index ? !card : card)
        //updates t/f depending on what cards is picked
        setCheckedState(isCardChecked)
        
        //updates the state with cards the the player is picking
        const updateHand = (cards, i) => {
            console.log(player[i])

            /**If card is selected, add to currSelection, if card already present, remove it */
            setCurrSelection(currSelection => cards[i] ? [...currSelection, player[i]] : currSelection.filter(el => el.code !== player[i].code))
            
        }
        updateHand(isCardChecked, index)
    }
    

    //handles the submit when player decides on how many cards to play
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('currSelection', currSelection)
        
        handleNewHand(currSelection)

    }

    // get current players cards
    let displayPlayerHand = player ?
    <fieldset className="CardPickForm-playerHand" >
    <legend>{isPlayerOne ? 'Player Ones Turn': 'Player Twos Turn'}</legend>
            {player.map((card, idx) => {
                return (
                    <div  className="card" key={card.code}>
                        <input
                            type="checkbox"
                            id={idx}
                            name="card"
                            checked={checkedState[idx]}
                            onChange={(e) => handleChange(card, idx)}></input>
                        <label  htmlFor={idx}>
                            <img className="GameTable-cards" alt={ card.code } key={card.code} src={card.image}></img>    
                        </label>
                    </div>
                )
            })}
            </fieldset>:
        <p>Loading player cards...</p>

    
    return (
        <form onSubmit={handleSubmit}>
       
        {displayPlayerHand}

        <button className="btn btn-default" type="submit">
          Submit
        </button>
      </form>
    )
}

export default CardPickerForm;