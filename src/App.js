import React, {useState} from 'react'
import './App.css';
import BigTwo from './gameLogic/game';
import PlayerCount from './PlayerCount';

function App() {

  /**Sets the player count to state based on handlePlayers()*/
  const [players, setPlayers] = useState(2);
  const [deck_id, setDeck_id] = useState(2);

  //set state so all player cards are stored

  //set state to show current player
  //set state to show currentPlay

  
  console.log(BigTwo.splitDeck(2, "ptwiqsnljtgr"))
  return (
    <div className="App">
      <PlayerCount handlePlayers={handlePlayers}/>
    </div>
  );
}

export default App;
