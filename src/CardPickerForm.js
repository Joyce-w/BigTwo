import React, { useState, useContext } from 'react';
import'./CardPickerForm.css';
import PlayersContext from './PlayersContext';

const CardPickerForm = () => {

    // get player cards
    const {isPlayerOne, playerOne, playerTwo } = useContext(PlayersContext)
    
    let player = isPlayerOne ? playerOne : playerTwo;

    // manage state of each possible card selected
    const [checkedState, setCheckedState] = useState(
        new Array(26).fill(false)
        );        

 

    // handle logic when a card is selected
    const handleCardSelect = (cardIdx, e) => {
        let isCardChecked = checkedState.map((card, idx) =>
            idx === cardIdx ? !card : card)
        setCheckedState(isCardChecked)
    }

    // get current players cards
    let displayPlayerHand = playerOne && playerTwo ?
    <fieldset className="CardPickForm-playerHand" >
    <legend>Choose your play</legend>
            {player.map((card, idx) => {
                return (
                    <div  className="card" key={card.code}>
                        <input type="checkbox" id={idx} name="card" value={card.code} checked={ checkedState[idx] } onChange={() =>handleCardSelect(idx)}></input>
                        <label  htmlFor={idx}>
                            <img className="GameTable-cards" alt={ card.code } key={card.code} src={card.image}></img>    
                        </label>
                    </div>
                )
            })}
            </fieldset>:
        <p>Loading player cards...</p>
    

    

    // store players decision
    const [numCards, setNumCards] = useState(null)
    // logs the card that the player picked
    const handleChange = (e) => {
        const { value } = e.target;
        setNumCards(value)
    }

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