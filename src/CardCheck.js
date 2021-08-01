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
        //orders the card from the hand based on value
        let cardValues = hand.map(card => PokerHands.numOrder[card.value]).sort((a, b) => a - b);
        
        let check5Cards = [PokerHands.isFlush(hand), PokerHands.isStraight(hand), PokerHands.isStraightFlush(hand,cardValues), PokerHands.isFourOfAKind(cardValues), PokerHands.isThreeCard(cardValues)].some(el => el)

        console.log('at least one true?', check5Cards)
        return check5Cards ? true : false;

    }
    
    /*check to see if single card higher than currPlay's card */
    static isHigherSingle = (hand, currHand) => {

        let handNumVal = CardCombos.numOrder[hand[0].value];
        let handSuitVal = CardCombos.suitOrder.indexOf(hand[0].suit);
        let currPlayNumVal = CardCombos.numOrder[currHand.cards[0].value]
        let currPlaySuitVal = CardCombos.suitOrder.indexOf(currHand.cards[0].suit);

        //if hand value is the same & suit is higher, true     
        if (handNumVal >= currPlayNumVal && handSuitVal > currPlaySuitVal) {
            return true;
        } else {
            return false;
        }
    }
 
    /*check if pair higher than currPlay's pair*/

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