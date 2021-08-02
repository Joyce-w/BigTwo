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
        
PokerHands.suitOrder = ["DIAMOND", "CLUBS", "HEART", "SPADE"];

PokerHands.pokerHand = [
    'flush',
    'straight',
    'straightFlush',
    'fourOfAKind',
    'threeKind'
]

export default PokerHands;