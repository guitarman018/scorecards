import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './players.css'

export default function Players() {
    const [num, setNum] = useState("")
    const [hide, setHide] = useState("hide")

    const navigate = useNavigate()
    

    
    function checkNum(){
        let gottenNum = localStorage.getItem("numPlayers")
        if(gottenNum>1 && gottenNum<8) {
          localStorage.setItem("numPlayers", num)
          navigate('/scoresdiv')
        }else{
          setHide("show")
        }   
      }
    
    


    useEffect(() => {
        localStorage.setItem("numPlayers", num)
    }, [num, hide])
    return (

        <div className="main">
          <div className="contents">
            <h1 className="playersH1">How many players are there?</h1>
            <div className="divInput">
              <input type="number" id="numPlayersInput" placeholder="2-7" onChange={(e) => setNum(e.target.value)} />
            </div>
            <div className="divButton">
              <button onClick={checkNum} id="btnGo">Play!</button>
            </div>
            <div className={hide} id="wrong">
                <span style={{color: 'red', fontSize: "3em", textAlign: "center", fontWeight: "bold"}}>Number must be between 2 and 7</span>
            </div>
          </div>
        </div>
        

    )
}