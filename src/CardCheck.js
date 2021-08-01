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
        //goes into pokerhands
        let cardValues = hand.map(card => PokerHands.numOrder[card.value]).sort((a, b) => a - b);

        //check if cards are a flush
        let isFlush = hand.map(card => card.suit).every((suit, idx, arr) => suit === arr[0])
        
        //check for straight
        let isSequential = cardValues
            .every((el, i, arr) => i === arr.length - 1 || el + 1 === arr[i + 1])
        
        //check for straight flush 
        let isStraightFlush = isFlush && isSequential ? true : false;

        //check for 4 of a kind
        const isFourOfAKind = (hand) => {
            let count = {};
            for (let val of cardValues) {
                if (count[val]) {
                    count[val] += 1;
                } else {
                    count[val] = 1;
                }
            }
            console.log('count', count)
            if (Object.values(count).includes(4)) {
                console.log('there are 4 cards of same value')
                return true;
            }
        }

        //check for 3 card combos (full house or 3 of a kind)
        const isThreeCard = (hand) => {
            let count = {};
            for (let val of cardValues) {
                if (count[val]) {
                    count[val] += 1;
                } else {
                    count[val] = 1;
                }
            }
            console.log('count', count)
            let arraySum = Object.values(count).sort((a, b) => a - b).join('');
            // 113 is 3 of a kind & 23 is full house
            let res = arraySum === '113' || arraySum === '23' ? true : false;
            return res

        }

        console.log(isThreeCard(hand))
    }
}

    
export default CardCombos;