import React, { useEffect, useState } from 'react'
import './LandingPg.css'

function LandingPg() {


    return (
      <div className="LandingPg">
            <h1>Welcome To A Game of <br></br>Big Two!</h1>
            <div className="LandingPg-instructions">
                <ul>
                    <li><b>Objective:</b>
                        <br></br>
                        Be the first player to play all your cards.</li>
                    <br></br>

                    <li><b>How to play:</b>
                        <br></br>
                        Player one starts by choosing a combination. Once played, player two must choose the same number of cards that was previously played
                        and beat the current hand displayed. Pressing pass will reset the current hand and the next player decides on the new combination.</li>
                    <br></br>
                    
                    <li><b>Combinations:</b>
                        <br></br>
                        Players can only play a single card, pair, or 5 card combination. Anything else is invalid!</li>
                    <br></br>

                    <li><b>Rankings:</b>
                        <br></br>
                        (Lowest)3, 4, 5, 6, 7, 8, 8, 9, 10, J, Q, K, A, 2 (Highest)
                        <br></br>
                        (Lowest) ♦, ♣ , ♥, ♠ (Highest)
                    </li>
                
                </ul>
            </div>
      </div>

  )

  //end of class
}
export default LandingPg;
