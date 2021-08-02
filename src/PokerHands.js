class PokerHands {

    static numOrder;
    static suitOrder;
    static pokerHand;

    //check if cards are a flush
    static isFlush = (hand) => {
        return hand.map(card => card.suit).every((suit, idx, arr) => suit === arr[0])
    } 
    
    //check for straight
    static isStraight = (valArr) => {
        let isStraight = valArr.every((el, i, arr) => i === arr.length - 1 || el + 1 === arr[i + 1])
        return isStraight
    }
    
    //check for straight flush 
    static isStraightFlush = (hand, valArr) => {
        let isFlush = hand.map(card => card.suit).every((suit, idx, arr) => suit === arr[0])
        let isStraight = valArr.every((el, i, arr) => i === arr.length - 1 || el + 1 === arr[i + 1])
        return isFlush && isStraight ? true : false
    }

    //check for 4 of a kind
    static isFourOfAKind = (valArr) => {
        
        let count = {};
        for (let val of valArr) {
            if (count[val]) {
                count[val] += 1;
            } else {
                count[val] = 1;
            }
        }
        if (Object.values(count).includes(4)) {
            return true;
        }
        return false;
    }

    //check for 3 card combos (full house or 3 of a kind)
    static isThreeCard = (valArr) => {
        let count = {};
        for (let val of valArr) {
            if (count[val]) {
                count[val] += 1;
            } else {
                count[val] = 1;
            }
        }
        let arraySum = Object.values(count).sort((a, b) => a - b).join('');
        // 113 is 3 of a kind & 23 is full house
        let res = arraySum === '113' || arraySum === '23' ? true : false;
        return res
    }

    //identify the 5 card hand 
    static identifyHand = (hand) => {
        //Extracts the value of the cards and orders the card ascending order
        let cardValues = hand.map(card => PokerHands.numOrder[card.value]).sort((a, b) => a - b);

        //get an array of the possible hands, displays t/f
        let checkCards = [
            PokerHands.isFlush(hand),
            PokerHands.isStraight(cardValues),
            PokerHands.isStraightFlush(hand, cardValues),
            PokerHands.isFourOfAKind(cardValues),
            PokerHands.isThreeCard(cardValues)].map(el => el)
        
        let handPlayed = PokerHands.pokerHand[checkCards.lastIndexOf(true)]
        return handPlayed;
    }

    //if the 5 card hand is a 3Kind, specify whether the card is three of a kind or full house
    static specify3Card = (hand) => {
        //Extracts the value of the cards and orders the card ascending order
        let cardValues = hand.map(card => PokerHands.numOrder[card.value]).sort((a, b) => a - b);

        let count = {};
        for (let val of cardValues) {
            if (count[val]) {
                count[val] += 1;
            } else {
                count[val] = 1;
            }
        }
        
        let arraySum = Object.values(count).sort((a, b) => a - b).join('');

        // 113 is 3 of a kind & 23 is full house
        let res = arraySum === '113' && arraySum !== '23' ? 'threeOfAKind' : 'fullHouse';
        return res
    }

    //If two hands are the same e.g. both full house, determine the higher hand
    static determineHigherHand = (pokerHand, hand, currPlay) => {
        console.log(pokerHand)
        let comparisons = [
            PokerHands.higherStraight,
            PokerHands.higherFourOfAKind,
            PokerHands.higherThreeCard,
            PokerHands.higherFlush,
            PokerHands.higherStraight,
            PokerHands.higherThreeCard
        ]
        return comparisons[pokerHand](hand, currPlay)
    }



    /**Compares both hands of similar poker hand name and 
     * determines who has the higher cards */

    //determines if hand is higher than currPlay in a straight
    static higherStraight = (hand, currPlay) => {
        console.log('this hits straight ')
        let highestHandCard = hand.map(card => PokerHands.numOrder[card.value]).sort((a, b) => b-a)[0];
        let highestCurrPlayCard = currPlay.map(card => PokerHands.numOrder[card.value]).sort((a, b) => b-a)[0];
        return highestHandCard > highestCurrPlayCard ? true : false;
    }

    //determines if hand is higher than currPlay in a flush
    static higherFlush = (hand, currPlay) => {
        console.log('this hits flush ')
        let handSuit = hand[0].suit;
        let currPlaySuit = currPlay[0].suit;

        //check the index of PokerHands.suitOrder, higher index means the higher suit
        return PokerHands.suitOrder.indexOf(handSuit) > PokerHands.suitOrder.indexOf(currPlaySuit) ? true : false;
        
    }

    //determines if hand is higher than currPlay in a straight flush
    static higherStraightFlush = (hand, currPlay) => {
        console.log('this hits straight flush ')
        let highestHandCard = hand.map(card => PokerHands.numOrder[card.value]).sort((a, b) => b-a)[0];
        let highestCurrPlayCard = currPlay.map(card => PokerHands.numOrder[card.value]).sort((a, b) => b-a)[0];
        
        //determine higher card
        if (highestHandCard > highestCurrPlayCard) {
            console.log('higher hand')
            return true
        }
        else if (highestCurrPlayCard > highestHandCard) {
            console.log('higher currPLay')
            return true
        } else {
            console.log('hand and currPlay equal in high card')
            //if high cards are a tie determine higher suit (same as flush logic)
            return PokerHands.higherFlush(hand, currPlay)            
        }
    }

    //determines if hand is higher than currPlay in 4 of a kind
    static higherFourOfAKind = (hand, currPlay) => {
        console.log('this hits 4 ')
        //get card value for hand
        let handCardVal = hand.map(card => card.value).sort((a, b) => a - b);

           //get count of cards
            let handCount = {};
            for (let val of handCardVal) {
                if (handCount[val]) {
                    handCount[val] += 1;
                } else {
                    handCount[val] = 1;
                }
            }
 
        let handIdxofFour = Object.values(handCount).findIndex(el => el === 4 )
        let handFourVal = Object.keys(handCount)[handIdxofFour]
        let handVal = PokerHands.numOrder[handFourVal]

        //get card value for currPlay
        let currPlayVals = currPlay.map(card => card.value).sort((a, b) => a - b);

            //get count of cards
            let currPlayCount = {};
            for (let val of currPlayVals) {
                if (currPlayCount[val]) {
                    currPlayCount[val] += 1;
                } else {
                    currPlayCount[val] = 1;
                }
            }
        
        let currPlayIdxofFour = Object.values(currPlayCount).findIndex(el => el === 4 )
        let currPlayFourVal = Object.keys(currPlayCount)[currPlayIdxofFour]
        let currPlayVal = PokerHands.numOrder[currPlayFourVal]

        //compare the higher value between hand and currPlay
        return handVal > currPlayVal ? true : false;
    }

    //determines if hand is higher than currPlay in full house or 3 of a kind
    static higherThreeCard = (hand, currPlay) => {
console.log('this hits 3 ')
        //get card value for hand
        let handCardVal = hand.map(card => card.value).sort((a, b) => a - b);

        console.log(handCardVal)
            //get count of cards
            let handCount = {};
            for (let val of handCardVal) {
                if (handCount[val]) {
                    handCount[val] += 1;
                } else {
                    handCount[val] = 1;
                }
            }
        console.log(handCount)

        let handIdxofFour = Object.values(handCount).findIndex(el => el === 3 )
        let handFourVal = Object.keys(handCount)[handIdxofFour]
        let handVal = PokerHands.numOrder[handFourVal]

        //get card value for currPlay
        let currPlayVals = currPlay.map(card => card.value).sort((a, b) => a - b);

            //get count of cards
            let currPlayCount = {};
            for (let val of currPlayVals) {
                if (currPlayCount[val]) {
                    currPlayCount[val] += 1;
                } else {
                    currPlayCount[val] = 1;
                }
            }
        console.log(currPlayCount)
        
        let currPlayIdxofFour = Object.values(currPlayCount).findIndex(el => el === 4 )
        let currPlayFourVal = Object.keys(currPlayCount)[currPlayIdxofFour]
        let currPlayVal = PokerHands.numOrder[currPlayFourVal]

        //compare the higher value between hand and currPlay
        return handVal > currPlayVal ? true : false;
    }
    
    
//end of PokerHand class
}

PokerHands.numOrder = {
    "3": 0,
    "4": 1,
    "5": 2,
    "6": 3,
    "7": 4,
    "8": 5,
    "9": 6,
    "10": 7,
    "JACK": 8,
    "QUEEN": 9,
    "KING": 10,
    "ACE": 11,
    "2": 12
};
        
PokerHands.suitOrder = ["DIAMONDS", "CLUBS", "HEARTS", "SPADES"];

PokerHands.pokerHand = [
    'flush',
    'straight',
    'straightFlush',
    'fourOfAKind',
    'threeKind'
]

export default PokerHands;