import React from 'react'
import './LandingPg.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { falinkedin } from '@fortawesome/free-solid-svg-icons'
function LandingPg() {


    return (
      <div className="LandingPg">
            <h1>Welcome To A Game of <br></br>Big Two!</h1>
            <div className="LandingPg-instructions">
                <ul>
                    <li><b>Objective:</b>
                        <br></br>
                        Be the first player to play all your cards.</li>
                    

                    <li><b>How to play:</b>
                        <br></br>
                        Player one starts by choosing a combination. Once played, player two must choose the same number of cards that was previously played
                        and beat the current hand displayed. Passing your turn will reset the current hand and the next player decides on the new combination.</li>
                    
                    
                    <li><b>Combinations:</b>
                        <br></br>
                        Players can only play a single card, pair, or 5 card combination. Anything else is invalid!</li>
                    

                    <li><b>Rankings:</b>
                        <br></br>
                        (Lowest)3, 4, 5, 6, 7, 8, 8, 9, 10, J, Q, K, A, 2 (Highest)
                        <br></br>
                        (Lowest) ♦, ♣ , ♥, ♠ (Highest)
                        <br></br>
                        (Lowest) Three of a Kind, Straight, Flush, Full House, Four of A Kind, Straight Flush(Highest)
                    </li>
                
                    <li>
                    <button><Link to="/game">Start Game</Link></button>                        
                    </li>


                                        {/* App information */}
                    <li>
                        <b>Meet the Engineer</b>
                        <div className="LandingPg-card">
                            <div className="LandingPg-img-border">
                            <img alt="Joyce the engineer" src="https://joyce-w.github.io/images/jwong2.jpg"></img>
                            </div>

                            
                            <p>
                            <h4>Joyce Wong</h4>
                            <a href="https://www.linkedin.com/in/hello-joycewong/"> <i class="fab fa-linkedin fa-2x"></i></a>                                
                            <a href="https://github.com/Joyce-w"> <i class="fab fa-github fa-2x"></i></a>                                
                            </p>


                        </div>


                        <b>About This App:</b>
                        <br></br>

                        
                        Created with <a href="https://reactjs.org/">React</a>, decorated with pure CSS
                        and deployed on <a href="https://www.heroku.com">Heroku</a>.
                        <br></br>
                        For <a href="https://mintbean.io/meets?sort=upcoming">Mintbean's</a> Hackathon!
                        {/* <FontAwesomeIcon icon={falinkedin} /> */}
                    </li>
                </ul>
            </div>
      </div>

  )

  //end of class
}
export default LandingPg;
