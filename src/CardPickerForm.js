import React, { useState, useContext } from 'react';
import'./CardPickerForm.css';
import PlayersContext from './PlayersContext';

const CardPickerForm = () => {

    // get player cards
    const {isPlayerOne, playerOne, playerTwo } = useContext(PlayersContext)
    
    let player = isPlayerOne ? playerOne : playerTwo;

    // manage state of each possible card selected
    const [checkedState, setCheckedState] = useState(() =>
        new Array(26).fill(false)
        );        

    // handle logic when a card is selected
    const [currSelection, setCurrSelection] = useState([]);


    const handleChange = (card, index) => {
        
        console.log(card.code)
        if (currSelection.length === 0) {
            setCurrSelection(card)
        }

        console.log(currSelection)
        
        let isCardChecked = checkedState.map((card, idx) =>
            idx === index ? !card : card)
        setCheckedState(isCardChecked)

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
                            onChange={(card, idx) => handleChange(card, idx)}></input>
                        <label  htmlFor={idx}>
                            <img className="GameTable-cards" alt={ card.code } key={card.code} src={card.image}></img>    
                        </label>
                    </div>
                )
            })}
            </fieldset>:
        <p>Loading player cards...</p>


    //handles the submit when player decides on how many cards to play
    const handleSubmit = (e) => {
        e.preventDefault();
        
        
    }
    return (
        <form>
        <div className="radio">
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
        
        {displayPlayerHand}

        <button className="btn btn-default" type="submit">
          Submit
        </button>
      </form>
    )
}

export default CardPickerForm;