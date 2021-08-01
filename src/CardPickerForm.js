import React, { useState, useContext, useEffect } from 'react';
import'./CardPickerForm.css';
import PlayersContext from './PlayersContext';

const CardPickerForm = ({handleNewHand}) => {

    // get player cards
    const {isPlayerOne, playerOne, playerTwo } = useContext(PlayersContext)
    
    let player = isPlayerOne ? playerOne : playerTwo;

    // manage state of each possible card selected
    const [checkedState, setCheckedState] = useState(() =>
        new Array(26).fill(false)
        );        

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
            setCurrSelection(currSelection => cards[i] ? [...currSelection, player[i]] : currSelection.filter(el => el.code !==player[i].code))
        }
        updateHand(isCardChecked, index)
    }
    

    //handles the submit when player decides on how many cards to play
    const handleSubmit = (e) => {
        e.preventDefault();
        handleNewHand(currSelection)
    }

    // get current players cards
    let displayPlayerHand = playerOne && playerTwo ?
    <fieldset className="CardPickForm-playerHand" >
    <legend>Choose your play</legend>
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
        {/* <div className="radio">
          <label>
            <input
              type="radio"
              name="cardPick"
              value="1"
              onChange={handleChange}
              
            />
            1 card
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              name="cardPick"
              value="2"
              onChange={handleChange}
            />
            2 cards
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              name="cardPick"
              value="3"
              onChange={handleChange}
            />
            3 cards
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              name="cardPick"
              value="5"
              onChange={handleChange}
            />
            5 cards
          </label>
        </div>
        <div>
        </div>
         */}
        {displayPlayerHand}

        <button className="btn btn-default" type="submit">
          Submit
        </button>
      </form>
    )
}

export default CardPickerForm;