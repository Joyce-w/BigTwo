import React, { useState, useContext, useEffect } from 'react';
import PlayersContext from './PlayersContext';
import "./GameTable.css"

const GameTable = (player,handleChange) => {
    const { isPlayerOne, playerOne, playerTwo } = useContext(PlayersContext)

        //return array of t/f depending on player's card length
    const [checkedState, setCheckedState] = useState(new Array(player.length).fill(false));
    

    return (
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
    )

}

export default GameTable;