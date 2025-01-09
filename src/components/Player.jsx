import { useState } from "react";

export default function Player({name, symbol ,isActive,onChangeName}){
    const [isEditing,setIsEditing]=useState(false);
    const [PlayerName,setPlayerName]=useState(name);
    
    function btnClicked(){
        setIsEditing(editing=>!editing);
        console.log(isEditing)
        if(isEditing){
          onChangeName(symbol,playerName)
        }
    }
    function chngeName(event){
      setPlayerName(event.target.value)
    }
    let playerName= <span className="player-name">{PlayerName}</span>;
    let btnCaption="Edit"
    if(isEditing){
        playerName=<input type="text" required value={PlayerName} onChange={chngeName} />
        btnCaption="Save"
    }
    return (
        <li className={isActive?'active':undefined} >
        <span className="player">
          {playerName}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={btnClicked}>{btnCaption}</button>
        
      </li>
    );
}