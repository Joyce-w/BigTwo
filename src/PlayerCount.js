
const PlayerCount = ({handlePlayers}) => {
    const handlePlayers = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log(name, value)
        setPlayers(e.target.playerCount)
        let id = BigTwo.shuffleNewCard();
        setDeck_id(id)
    }

    //keep track of how many players


        
        <div className="App">
      <form onSubmit={handlePlayers}>
        How many players? (2 = player + robot)
        <input name="playerCount" type="number" min="2" max="3"/>
        <button >Divide cards</button>
      </form>        
    </div>
    )

    
}
  

export default PlayerCount;
