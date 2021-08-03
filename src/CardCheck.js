import PokerHands from "./PokerHands";

class CardCombos {

    static numOrder;
    static suitOrder;

    /**Make sure the number of cards the player plays is equal to the currHand*/
    static validCardPlay = (currPlayCards, newHandCount) => {
        let validNumCards = [1, 2, 5];
        console.log(currPlayCards, newHandCount)
        //if currPlay is empty & newHandCount is not & has valid cards, valid play
        if (currPlayCards === 0 && newHandCount !== 0 && validNumCards.includes(newHandCount)) {
            return true;
        } //if currPlayCards is not 0 and newHandCount is equal to that number, valid play
        else if (currPlayCards !== 0 && newHandCount === currPlayCards) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Handle whether 2 card are the same value to make a pair 
     * or 5 cards is valid to make a poker hand 
     * */

    /**Handles pair card play */
    static isValidPair = (hand) => {
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
        //orders the card from the hand based on value
        let cardValues = hand.map(card => PokerHands.numOrder[card.value]).sort((a, b) => a - b);
        
        let check5Cards = [
            PokerHands.isFlush(hand),
            PokerHands.isStraight(cardValues),
            PokerHands.isStraightFlush(hand, cardValues),
            PokerHands.isFourOfAKind(cardValues),
            PokerHands.isThreeCard(cardValues)].some(el => el);

        console.log('at least one true?', check5Cards)
        return check5Cards ? true : false;

    }
    
    /**
     * If there is a currPlay (cards to beat), then compare it with the hand that the player picked and check to see if it is higher. 
     * e.g. currPlay: [5C, 5D] & hand: [6S, 6D]. hand has the higher cards.
     */

    /*check to see if single card higher than currPlay's card */
    static isHigherSingle = (hand, currPlay) => {
        console.log(hand, currPlay)

        let handNumVal = CardCombos.numOrder[hand[0].value];
        let handSuitVal = CardCombos.suitOrder.indexOf(hand[0].suit);
        let currPlayNumVal = CardCombos.numOrder[currPlay[0].value]
        let currPlaySuitVal = CardCombos.suitOrder.indexOf(currPlay[0].suit);
        console.log('curr',currPlayNumVal,'curr suit',currPlaySuitVal)
        console.log('hand', handNumVal, 'hand suit', handSuitVal)
        
        
        //if hand value is the same & suit is higher, true     
        if (handNumVal > currPlayNumVal) {
            console.log('hand is greater/ equal to currPlay')
            return true;
        }
        else if (handNumVal === currPlayNumVal) {
            if (handSuitVal >= currPlaySuitVal) {
                console.log('hand val greater than suit')
                return true;
            } else {
                console.log('currPlay val is higher in suit')
                return false;                
            }            
        } else {
            console.log('hand is lower than currPlay')
            return false;            
        }
    }
 
    /*check if pair higher than currPlay's pair*/
    static isHigherPair = (hand, currPlay) => {
        /*Get highest card for hand & currPlay based off CardCombos.suitOrder number. Already know the value is the same for each respective hand so no need to compare card values */
        let highHandCard = CardCombos.suitOrder.indexOf(hand[0].suit) > CardCombos.suitOrder.indexOf(hand[1].suit) ? hand[0] : hand[1];

        /*get highest card for currPlay based off suit*/        
        let highcurrPlayCard = CardCombos.suitOrder.indexOf(currPlay.cards[0].suit) > CardCombos.suitOrder.indexOf(currPlay.cards[1].suit) ? currPlay.cards[0] : currPlay.cards[1];
        
        console.log(highHandCard, highcurrPlayCard)
        //If hand num is higher than currPlay , compare suit using isHigherSingle logic from above
        let isHandHigher =CardCombos.isHigherSingle([highHandCard], [highcurrPlayCard])
        return isHandHigher;

    }

    /*check if 5 card higher than currPlay's 5card*/
    static isHigher5Card = (hand, currPlay) => {
        //Identify the hand of the 5 card
        let handName = PokerHands.identifyHand(hand);
        if (handName === 'threeKind') {
            handName = PokerHands.specify3Card(hand);
        }
        console.log('hand',handName);

        //identify currPlay poker hand name
        let currPlayName = PokerHands.identifyHand(currPlay);
        if (currPlayName === 'threeKind') {
            currPlayName = PokerHands.specify3Card(currPlay);
        }
        console.log('currplay', currPlayName);

        //Use number scoring to identify 
        let handScore = CardCombos.fiveCardScore[handName];
        let currPlayScore = CardCombos.fiveCardScore[currPlayName];

        /*currPlay cards are higher points than the hand. 
        *Lower the number on CardCombos.fiveCardScore the higher the value
       */
        
        console.log('currPlay',currPlayScore , 'hand',handScore)
        if (currPlayScore < handScore) {
            console.log('current play ishigher')
            return false;
        }
        //currPlay cards are lower points than the hand
        else if (handScore < currPlayScore) {
            console.log('hand play is higher')
            return true;
        }


        // scores are equal, identify which is higher. either handScore or currPlayScore works.
        let res = PokerHands.determineHigherHand(handScore, hand, currPlay)
        return res
    }


        // return handName;
}

    

CardCombos.numOrder = {
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
        
CardCombos.suitOrder = ["DIAMONDS", "CLUBS", "HEARTS", "SPADES"];

CardCombos.pokerRank = [
    'straightFlush',
    'fourKind',
    'fullHouse',
    'flush',
    'straight',
    'threeKind'
]

CardCombos.fiveCardScore = {
    'straightFlush': 0,
    'fourKind': 1,
    'fullHouse':2,
    'flush': 3,
    'straight' : 4,
    'threeOfAKind': 5    
}


export default CardCombos;