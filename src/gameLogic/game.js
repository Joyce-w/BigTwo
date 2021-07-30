import axios from "axios";

class BigTwo {
    static id;

    //get a single shuffled deck from api
    static async shuffleNewCard() {
        let deck = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        return deck.deck_id;

    }

    static async splitDeck(players, deck_id) {
        if (players === 2) {
            let p1 = await axios.get(`https://deckofcardsapi.com/api/deck/${"sdg7wuv6cqsn"}/draw/?count=2`)
            let p2 = await axios.get(`https://deckofcardsapi.com/api/deck/${"sdg7wuv6cqsn"}/draw/?count=2`)
            console.log(p1.data, p2.data)
            //return both data in an object/array 
            return (p1.data, p2.data)
        }
    }

    /**Handles single card play */
    static async single() {
        if (currPlay = null) {
            currPlay = `${currPlay}`
            //remove card from players hand
            //checkwin()
        }
        else if (card > currPlay) {
            currPlay = `${currPlay}`
            //remove card from players hand
            //checkwin()
        } else if (card < currPlay || pickCard !== currPlay.length){
            console.log('Invalid PLay! Try again or pass!')
        }
    }
    /**Handles pair card play */

    /**Handles triple card play */
    
    /**Handles 5 card play */
        
}


    
export default BigTwo;