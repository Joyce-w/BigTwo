import axios from "axios";

class Deck {

    //get a single shuffled deck from api
    static async shuffleNewCard() {
        let deck = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        return deck.data;

    }

    static async splitDeck(players, deck_id) {
        if (players === 2) {
            let p1 = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=26`)
            let p2 = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=26`)
            
            return {p1, p2};
        }
    }
        
}


    
export default Deck;