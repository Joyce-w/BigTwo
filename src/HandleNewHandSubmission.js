class HandNewSubmission {

    //Updates the player's hand in the state
    static updatePlayerHand = (hand) => {
        let codes = hand.map(card => card.code)
        console.log(codes)
        return codes
    } 

    
//end of HandNewSubmission class
}

export default HandNewSubmission;