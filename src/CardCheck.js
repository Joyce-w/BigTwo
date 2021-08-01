import PokerHands from "./PokerHands";

class CardCombos {
    static id;

    /**Make sure the number of cards the player plays is equal to the currHand*/
    static validCardPlay = (currPlayCards, newHandCount) => {
        let validNumCards = [1, 2, 5];
        console.log(currPlayCards, newHandCount)
        //if currPlay is empty & newHandCount is not & has valid cards, valid play
        if (currPlayCards === 0 && newHandCount !== 0 && validNumCards.includes(newHandCount)) {
            console.log('this is a valid play')
            return true;
        } //if currPlayCards is not 0 and newHandCount is equal to that number, valid play
        else if (currPlayCards !== 0 && newHandCount === currPlayCards) {
            console.log('they are the same number of cards not 0')
            return true;
        }        
        else {
            return false;
        }
    }

    /**Handles single card play */
    // static async single() {
    //     if (currPlay = null) {
    //         currPlay = `${currPlay}`
    //         //remove card from players hand
    //         //checkwin()
    //     }
    //     else if (card > currPlay) {
    //         currPlay = `${currPlay}`
    //         //remove card from players hand
    //         //checkwin()
    //     } else if (card < currPlay || pickCard !== currPlay.length){
    //         console.log('Invalid PLay! Try again or pass!')
    //     }
    // }
    /**Handles pair card play */
    static isValidPair = (hand) => {
        console.log(hand)
        if (hand[0].value === hand[1].value) {
            console.log('they are the same value!')
            return true;
        } else {
            console.log('they are not a pair')
            return false
        }
    }

    /**Handles 5 card play */
    static isValidFiveCard = (hand) => {

        console.log( PokerHands.isValidFiveCard())
    }
}


    
export default CardCombos;