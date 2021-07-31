import React, { useContext } from 'react';
import PlayersContext from './PlayersContext';
import "./GameTable.css"

const GameTable = () => {
    const { isPlayerOne, playerOne, playerTwo } = useContext(PlayersContext)

    let player = isPlayerOne ? playerOne : playerTwo
    //displays cards depending on who isCurrentPlayer
    let display = playerOne && playerTwo ?
            player.map(card => {
                 return <img className="GameTable-cards" alt={ card.code } key={card.code} src={card.image}></img>      
            }) :
            <p>Loading player cards...</p>
    
    
    return (
        <div className="GameTable">
            {player === playerOne ? <p>Player One's turn!</p> : <p>Player Two's turn!</p>}
            {display}
        </div>
    )
}

export default GameTable;