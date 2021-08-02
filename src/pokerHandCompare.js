let hand = [
      { code: "6C", image: "https://deckofcardsapi.com/static/img/6C.png", images:null, value: "9", suit: "CLUBS" },
      { code: "5C", image: "https://deckofcardsapi.com/static/img/5C.png", images:null, value: "9", suit: "CLUBS" },
      { code: "8C", image: "https://deckofcardsapi.com/static/img/8C.png", images:null, value: "9", suit: "CLUBS" },
      { code: "7C", image: "https://deckofcardsapi.com/static/img/7C.png", images:null, value: "2", suit: "CLUBS" },
      {code: "9C", image: "https://deckofcardsapi.com/static/img/9C.png", images: null, value: "10", suit: "CLUBS"}
]
let currPlayer = [
      { code: "6C", image: "https://deckofcardsapi.com/static/img/6C.png", images:null, value: "8", suit: "CLUBS" },
      { code: "5C", image: "https://deckofcardsapi.com/static/img/5C.png", images:null, value: "8", suit: "CLUBS" },
      { code: "8C", image: "https://deckofcardsapi.com/static/img/8C.png", images:null, value: "8", suit: "CLUBS" },
      { code: "7C", image: "https://deckofcardsapi.com/static/img/7C.png", images:null, value: "4", suit: "CLUBS" },
      {code: "9C", image: "https://deckofcardsapi.com/static/img/9C.png", images: null, value: "7", suit: "CLUBS"}
]

    
const higherFourOfAKind = (hand, currPlayer) => {
    let numOrder = {
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
    
    //count the frequency of each card
    let cardValues = hand.map(card => card.value).sort((a, b) => a - b);
    console.log(cardValues)
        //get count of cards
        let count = {};
        for (let val of cardValues) {
            if (count[val]) {
                count[val] += 1;
            } else {
                count[val] = 1;
            }
        }
    console.log(count)
    
    let handIdxofFour = Object.values(count).findIndex((el,idx) => el === 3 )
    let handFourVal = Object.keys(count)[handIdxofFour]
    let handVal = numOrder[handFourVal]
    console.log(handVal)
    // /.find(el => numOrder[el])
    // console.log(numOrder[test])

    // ////////////////////
    // let currVals = currPlayer.map(card => card.value).sort((a, b) => a - b);

    //     //get count of cards
    //     let currCount = {};
    //     for (let val of currVals) {
    //         if (currCount[val]) {
    //             currCount[val] += 1;
    //         } else {
    //             currCount[val] = 1;
    //         }
    //     }
    // console.log(currCount)
    
    // let test1 = Object.keys(currCount).find(el => numOrder[el])
    // console.log(numOrder[test1])

    //     //find the card with a count of 4
    //     //compare the higher value

}

console.log(higherFourOfAKind(hand,currPlayer))


let numOrder = {
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
        
let suitOrder = ["DIAMONDS", "CLUBS", "HEARTS", "SPADES"];



//test high straight flush
//-********************************
// const higherStraightFlush = (hand, currPlay) => {


//     const higherFlush = (hand, currPlay) => {
//         let handSuit = hand[0].suit;
//         let currPlaySuit = currPlay[0].suit;

//         //check the index of PokerHands.suitOrder, higher index means the higher suit
//         console.log('hand',handSuit,'currplay', currPlaySuit)
//         console.log('hand',suitOrder.indexOf(handSuit),'currplay', suitOrder.indexOf(currPlaySuit))
//         return suitOrder.indexOf(handSuit) > suitOrder.indexOf(currPlaySuit) ? true : false;
        
//     }
    
    
//     let highestHandCard = hand.map(card => numOrder[card.value]).sort((a, b) => b-a)[0];
//     let highestCurrPlayCard = currPlay.map(card => numOrder[card.value]).sort((a, b) => b-a)[0];
    
//     //determine higher card
//     if (highestHandCard > highestCurrPlayCard) {
//         console.log('higher hand')
//         return true
//     }
//     else if (highestCurrPlayCard > highestHandCard) {
//         console.log('higher currPLay')
//         return true
//     } else {
//         console.log('hand and currPlay equal in high card')
//         //if high cards are a tie determine higher suit (same as flush logic)
//         return higherFlush(hand, currPlay)            
//     }

// }

// console.log(higherStraightFlush(hand, currPlay))