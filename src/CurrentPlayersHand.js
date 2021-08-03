import React, { useState, useContext, useEffect } from 'react';
import'./CurrentPlayersHand.css';
import PlayersContext from './PlayersContext';

const CurrentPlayersHand = () => {
    // get player card from context
    const { isPlayerOne, playerOne, playerTwo, handleNewHand, handlePass } = useContext(PlayersContext)

    //store the current player into state
    const [player, setPlayer] = useState(isPlayerOne ? playerOne : playerTwo)


    /** Return array of t/f depending on current player's card length
     * Used to mark which cards were 'checkboxed' (selected)
    */
    const [checkedState, setCheckedState] = useState(
        isPlayerOne ?
            new Array(playerOne.length).fill(false) :
            new Array(playerTwo.length).fill(false)
    );

    //updates state to correct player when isPlayerone is changed
    useEffect(() => {
        setPlayer(isPlayerOne ? playerOne : playerTwo)
    },[isPlayerOne])
  
    // Used to hold the data of the currently selected cards
    const [currSelection, setCurrSelection] = useState([])

    //handle state when player picks cards
    const handleChange = (card, index) => {
        //check if the card is 'checkboxed' in state, toggle t/f on clicks
        let isCardChecked = checkedState.map((card, idx) =>
            idx === index ? !card : card)
        //updates t/f depending on what cards was selected
        setCheckedState(isCardChecked)
        
        //updates the state with cards the the player is selecting
        const updateHand = (cards, i) => {
            console.log(player[i])
            /**If card is selected, upate to currSelection, if card already present, remove it */
            setCurrSelection(currSelection =>
                cards[i]
                    ? [...currSelection, player[i]] :
                    currSelection.filter(el => el.code !== player[i].code)
            )
        }
        updateHand(isCardChecked, index)
    }
    

    //handles the submit when player decides on how many cards to play
    const handleSubmit = (e) => {
        e.preventDefault();
        
        //logic from parent component to check if cards selected are valid to play
        handleNewHand(currSelection)
        //reset the state of the checkboxes & clears the state of any cards that were previously selected
        setCurrSelection([])
        setCheckedState(isPlayerOne ? new Array(playerOne.length).fill(false) : new Array(playerTwo.length).fill(false))
    }

    // get current players cards

    return (
        <div className="CardPickForm">
            
            <form className="CardPickForm-form" onSubmit={handleSubmit}>

                <fieldset className="CardPickForm-playerHand" >
                    <legend>{isPlayerOne ? <b>Player Ones Turn</b>: <b>Player Twos Turn</b>}</legend>
                        {player.map((card, idx) => {
                            return (
                                <div className="card" key={card.code}>
                                    <input
                                        type="checkbox"
                                        id={idx}
                                        name="card"
                                        checked={checkedState[idx]}
                                        onChange={(e) => handleChange(card, idx)}></input>
                                    <label  htmlFor={idx}>
                                        <img className="CardPickForm-cards" alt={ card.code } key={card.code} src={card.image}></img>    
                                    </label>
                                </div>
                            )
                        })}
                </fieldset>
                <button className="Submit" type="submit"> Play Cards </button>
                or
                <button onClick={handlePass}>Pass Your Turn</button>

        </form>
      </div>
    )
}

export default CurrentPlayersHand;