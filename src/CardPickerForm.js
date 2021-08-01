import React, { useState, useContext, useEffect } from 'react';
import'./CardPickerForm.css';
import PlayersContext from './PlayersContext';

const CardPickerForm = ({handleNewHand}) => {
    // store players decision
    const [numCards, setNumCards] = useState(null)

    // get player cards
    const {isPlayerOne, playerOne, playerTwo } = useContext(PlayersContext)
    
    let player = isPlayerOne ? playerOne : playerTwo;

    // manage state of each possible card selected
    const [checkedState, setCheckedState] = useState(() =>
        new Array(26).fill(false)
        );        

    // handle logic when a card is selected
    const [currSelection, setCurrSelection] = useState([])

    const [currHand, setCurrHand] = useState([]);


    //         // if (!hand) {
    //         //     console.log('empty hand')
    //         //     //set selection to hand
    //         //     setCurrHand(data => data)
    //         //     console.log('this is hand' ,hand)
    //         // } else {
    //         //     console.log('NOT empty hand')
    //         //     //iterate thru hand
    //         //     //if selection[0] matches any hand.code return true
    //         //     let test = hand.filter(el => console.log(el))
    //         //     console.log(test)
    //         // }

    //     }
    //     isDupe(currSelection, currHand)
  
    // }, [currSelection])
    
    //how to check for dupes? 
    const handleChange = (card, index) => {
        console.log(card)
        const updateCards = (c) => {
            setCurrHand((currHand) => [...currHand, c])
        }
        updateCards(card)
            
        //check if the card is 'checkboxed' in state, toggle on clicks
        let isCardChecked = checkedState.map((card, idx) =>
            idx === index ? !card : card)
        setCheckedState(isCardChecked)

    }
    

    //handles the submit when player decides on how many cards to play
    const handleSubmit = (e) => {
        e.preventDefault();
        handleNewHand(currHand)
        console.log(currHand)
        
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