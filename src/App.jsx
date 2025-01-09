import Player from "./components/Player.jsx"
import GameBoard from "./components/GameBoard.jsx"
import GameOver from "./components/GameOver.jsx"
import Log  from "./components/Log.jsx"
import { useState } from "react";
import {WINNING_COMBINATIONS} from "./winning_combinations.js"

const INITIAL_GAME_BOARD=[
  [null,null,null],
  [null,null,null],
  [null,null,null]
]
const PLAYERS={X:'player 1' , O:'player 2',}

function deriveWinner(currentBoard,playerName){
  let winner=null;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol=currentBoard[combination[0].row][combination[0].column];
    const secSquareSymbol=currentBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol=currentBoard[combination[2].row][combination[2].column];
    if(firstSquareSymbol&&firstSquareSymbol===secSquareSymbol&&secSquareSymbol===thirdSquareSymbol){
      winner=playerName[firstSquareSymbol];
    
    }
  }
  return winner;
}

function getActivePlayer(gameTurns){
  let PlayerTurn="X";
  if(gameTurns.length>0 && gameTurns[0].player==='X'){
    PlayerTurn='O'
  } 
  return PlayerTurn;
}
function App() {
  
  const [playerName,setPlayerName]=useState(PLAYERS)
  const[gameTurns,setGameTurns]=useState([])
  let activePlayer=getActivePlayer(gameTurns);
 
  let currentBoard=[...INITIAL_GAME_BOARD.map(init=>[...init])]
  for(const turn of gameTurns){
      const {square,player}=turn;
      const {row,col}=square;
      currentBoard[row][col]=player
  }
  let winner =deriveWinner(currentBoard,playerName)
  let draw=null;
  if(gameTurns.length===9){
    draw=true
  }
  function handleActivePlayer(rowIndex,colIndex){
     
     setGameTurns((prevTurns)=>{
      
      let PlayerTurn= getActivePlayer(prevTurns)
      const updatedTurns=[ {square:{row:rowIndex,col:colIndex},player:PlayerTurn},...prevTurns]
      return updatedTurns;
    })
  }
  function handlePlayerNameChange(symbol,newName){
    setPlayerName(prev=>{
      return {
        ...prev,
        [symbol]:newName
      }
    })
  }
  function handleRestart(){
    setGameTurns([]);
  }
  return (
   <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
         <Player name={PLAYERS.X} symbol="X" isActive={activePlayer==='X'} onChangeName={handlePlayerNameChange}/>
         <Player name={PLAYERS.O} symbol="O" isActive={activePlayer==='O'} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner||draw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleActivePlayer} board={currentBoard} />
      </div>
     
      <Log turns={gameTurns}/>
   </main>
   
  )
}

export default App
