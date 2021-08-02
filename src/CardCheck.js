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
        
        let check5Cards = [PokerHands.isFlush(hand), PokerHands.isStraight(hand), PokerHands.isStraightFlush(hand,cardValues), PokerHands.isFourOfAKind(cardValues), PokerHands.isThreeCard(cardValues)].some(el => el)

        console.log('at least one true?', check5Cards)
        return check5Cards ? true : false;

    }
    
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
        if (handNumVal >= currPlayNumVal) {
            console.log('hand is greater/ equal to currPlay')
            if (handSuitVal >= currPlaySuitVal) {
                console.log('hand val greater than suit')
                return true;
            }
                console.log('currPlay suit is higher in suit')
                return false;
        } else {
            console.log('hand is lower than currPlay')
            return false;            
        }


        //same as lin1 61 to 64
        // if(handNumVal >= currPlayNumVal && handSuitVal > currPlaySuitVal){
        //     return true;

        // }
        // else if (handNumVal > currPlayNumVal && handSuitVal < currPlaySuitVal)  {
        //     return true;
        // }
        // else {
        //     return false;
        // }
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

    
export default CardCombos;