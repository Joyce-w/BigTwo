import PokerHands from "./PokerHands";

class CardCombos {

    static numOrder;
    static suitOrder;

    /**Make sure the number of cards the player plays is equal to the currHand*/
    static validCardPlay = (currPlayCards, newHandCount) => {
        let validNumCards = [1, 2, 5];
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
            return true;
        } else {
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

        return check5Cards ? true : false;

    }
    
    /**
     * If there is a currPlay (cards to beat), then compare it with the hand that the player picked and check to see if it is higher. 
     * e.g. currPlay: [5C, 5D] & hand: [6S, 6D]. hand has the higher cards.
     */

    /*check to see if single card higher than currPlay's card */
    static isHigherSingle = (hand, currPlay) => {

        let handNumVal = CardCombos.numOrder[hand[0].value];
        let handSuitVal = CardCombos.suitOrder.indexOf(hand[0].suit);
        let currPlayNumVal = CardCombos.numOrder[currPlay[0].value]
        let currPlaySuitVal = CardCombos.suitOrder.indexOf(currPlay[0].suit);
        
        //if hand value is the same & suit is higher, true     
        if (handNumVal > currPlayNumVal) {
            return true;
        }
        else if (handNumVal === currPlayNumVal) {
            if (handSuitVal >= currPlaySuitVal) {
                return true;
            } else {
                return false;                
            }            
        } else {
            return false;            
        }
    }
 
    /*check if pair higher than currPlay's pair*/
    static isHigherPair = (hand, currPlay) => {
        /*Get highest card for hand & currPlay based off CardCombos.suitOrder number. Already know the value is the same for each respective hand so no need to compare card values */
        let highHandCard = CardCombos.suitOrder.indexOf(hand[0].suit) > CardCombos.suitOrder.indexOf(hand[1].suit) ? hand[0] : hand[1];

        /*get highest card for currPlay based off suit*/        
        let highcurrPlayCard = CardCombos.suitOrder.indexOf(currPlay.cards[0].suit) > CardCombos.suitOrder.indexOf(currPlay.cards[1].suit) ? currPlay.cards[0] : currPlay.cards[1];
        
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

        //identify currPlay poker hand name
        let currPlayName = PokerHands.identifyHand(currPlay);
        if (currPlayName === 'threeKind') {
            currPlayName = PokerHands.specify3Card(currPlay);
        }

        //Use number scoring to identify 
        let handScore = CardCombos.fiveCardScore[handName];
        let currPlayScore = CardCombos.fiveCardScore[currPlayName];

        /*currPlay cards are higher points than the hand. 
        *Lower the number on CardCombos.fiveCardScore the higher the value
       */
        
        if (currPlayScore < handScore) {
            return false;
        }
        //currPlay cards are lower points than the hand
        else if (handScore < currPlayScore) {
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
    'fourOfAKind': 1,
    'fullHouse':2,
    'flush': 3,
    'straight' : 4,
    'threeOfAKind': 5    
}


export default CardCombos;