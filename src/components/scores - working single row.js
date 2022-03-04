import { useState } from 'react'
import { Link } from "react-router-dom"

import './scores.css'
import red from "../images/1-red.jpg"
import coin from "../images/2-coin.jpg"


export default function Scores() {

    // let players = localStorage.getItem("numPlayers")
    // const [players, setPlayers] = useState(4)
    let players = 7
    
    //const [row, setRow] = useState()
    const playersPercent = 80/players
    const playersStylePercent = "" + playersPercent + "%"
    const tdStyle = {
        backgroundColor: "aqua",
        width: playersStylePercent
    }

    
    
    
    function buildCells(rowNum) {
        let cells = []
        for (let i = 1; i <= players; i++) {
            let cellId = `cell${i}-row${rowNum}`
            console.log(cellId)
            cells.push(<td style={tdStyle} key={cellId} id={cellId}>Cell</td>)
        }
        return cells
    }

    

    // function generateRow(rowNum){
    //     let cells = []
    //     for (let i = 1; i++; i <= players) {
    //         let cellId = `cell${i}-row${rowNum}`
    //         cells.push(<td key={cellId} id={cellId}>Cell {cellId}</td>)
    //     }
    //     return cells
    // }

    
    return(
        <div>
            <h1>/scores - {players} players!</h1>
            <Link to='/'>Back to main screen</Link>
            <table id="scoreTable">
                <tbody>
                <tr className="board">
                    <td className="icon"><img src={red}/></td>
                    {buildCells(1)}          
                </tr>
                <tr className="board">
                    <td className="icon"><img src={coin}/></td>
                    {buildCells(2)}          
                </tr>
                    
                </tbody>
            </table>
        </div>

    )
}