import { useEffect, useState } from "react";
import axios from "axios";

const useDeckSetup = () => {
    const [deckID, setDeckID] = useState(null)
    useEffect(() => {
        //get newly shuffled deck id from api
        const getShuffledDeck = async () => {
            try {
                const res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
                setDeckID(res.deck_id)
            } catch (e) {
                console.log(e)
            }
        }
    })
}

export default useDeckSetup;