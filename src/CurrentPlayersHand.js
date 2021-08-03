import React, { useState, useContext, useEffect } from 'react';
import'./CardPickerForm.css';
import PlayersContext from './PlayersContext';

const CurrentPlayersHand = () => {
    // get player cards
    const { isPlayerOne, playerOne, playerTwo, handleNewHand } = useContext(PlayersContext)
    
  
  const [player, setPlayer] = useState(isPlayerOne ? playerOne : playerTwo)
console.log(player)
    // manage state of each possible card selected

    //return array of t/f depending on player's card length
  const [checkedState, setCheckedState] = useState(new Array(player.length).fill(false));
    console.log(checkedState)
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

    return (
        <form onSubmit={handleSubmit}>
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
            </fieldset>
        <button className="btn btn-default" type="submit">
          Submit
        </button>
      </form>
    )
}

export default CurrentPlayersHand;