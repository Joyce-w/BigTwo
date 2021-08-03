import React, { useState, useContext, useEffect } from 'react';
import'./CardPickerForm.css';
import PlayersContext from './PlayersContext';
import CurrentPlayersHand from './CurrentPlayersHand';

const CardPickerForm = ({handleNewHand}) => {
    // get player cards
    const {isPlayerOne, playerOne, playerTwo } = useContext(PlayersContext)

//   const [cardLength, setCardLength] = useState(2)
  
  const [player, setPlayer] = useState(isPlayerOne ? playerOne : playerTwo)

//     // manage state of each possible card selected

//     //return array of t/f depending on player's card length
//   const [checkedState, setCheckedState] = useState(new Array(player.length).fill(false));

//   // useEffect(() => {
//   //     console.log('player is determiend')
//   //     console.log(player)
//   //     setCheckedState(new Array(isPlayerOne ? playerOne.length : playerTwo.length).fill(false))
      
//   //   },[player])
  
//     //updates player when isPlayerone is toggled
//     useEffect(() => {
//         setPlayer(isPlayerOne ? playerOne : playerTwo)
//         console.log(isPlayerOne ? 'player one currently' : 'player two currently')
//         setCurrSelection([])
//     },[isPlayerOne])
  
//     // handle logic when a card is selected
//     const [currSelection, setCurrSelection] = useState([])

//     //handle state when player picks cards
//     const handleChange = (card, index) => {
//         //check if the card is 'checkboxed' in state, toggle on clicks
//         let isCardChecked = checkedState.map((card, idx) =>
//             idx === index ? !card : card)
//         //updates t/f depending on what cards is picked
//         setCheckedState(isCardChecked)
        
//         //updates the state with cards the the player is picking
//         const updateHand = (cards, i) => {
//             console.log(player[i])

//             /**If card is selected, add to currSelection, if card already present, remove it */
//             setCurrSelection(currSelection => cards[i] ? [...currSelection, player[i]] : currSelection.filter(el => el.code !== player[i].code))
            
//         }
//         updateHand(isCardChecked, index)
//     }
    


    // get current players cards

    return (
        <>
            {player ? <CurrentPlayersHand />:
                <p>Loading player cards...</p>
            }
        </>
    )
}

export default CardPickerForm;