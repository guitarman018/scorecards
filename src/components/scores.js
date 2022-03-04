import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

import './scores.css'
import red from "../images/1-red.jpg"
import coin from "../images/2-coin.jpg"
import wonders from "../images/3-wonders.jpg"
import blue from "../images/4-blue.jpg"
import yellow from "../images/5-yellow.jpg"
import purple from "../images/6-purple.jpg"
import green from "../images/7-green.jpg"
import sum from "../images/8-sum.jpg"


export default function Scores() {

    let players = parseInt(localStorage.getItem("numPlayers"))

    // const [players, setPlayers] = useState(numPlayers)
    // setPlayers(localStorage.getItem("numPlayers"))
    
    const playersPercent = 80/players
    const playersStylePercent = "" + playersPercent + "%"
    const [playerScores, setPlayerScores] = useState(Array(players).fill(0).map(row => new Array(7).fill(0)))
    const [playerTotals, setPlayerTotals] = useState(Array(players).fill(0))

    console.log(playerTotals)
    

    const imgStyle = {
        display: "block",
        height: "100%"
    }

    const sumStyle = {
        textAlign: "center",
        
        fontWeight: "bold",
        
    }

    function update(e){
        
        let idString = e.target.id
        let rowGet = idString.charAt(4)
        let colGet = idString.charAt(9)
        let copy = playerScores
        if(e.target.value >= 0){
            copy[rowGet-1][colGet-1] = parseInt(e.target.value)
        }
        setPlayerScores(copy)
        console.log(copy)
        
        
        // Update totals:
        let playerSum = 0
        let newTotals = Array(players).fill(0)
        console.log(`new totals: ${newTotals}`)
        for (let i=0; i<players; i++) {
            playerSum = 0
            for (let j=0; j<8; j++) {
                if(playerScores[i][j] > 0 && playerScores[i][j] != "") {
                    playerSum += playerScores[i][j]
                }
                console.log(`reading: ${playerScores[i][j]}`)
            }
            newTotals[i] = playerSum
        }
        setPlayerTotals(newTotals)

        

    }
    
    function buildNames() {
        let playerCells = []
        playerCells.push(<td style={{textAlign: "center", fontFamily: "sans-serif"}}>Names:</td>)
        for (let i = 1; i <= players; i++) {
            playerCells.push(<td className="nameLeft"><input type="text" style={{fontSize: 16, fontFamily: "sans-serif"}} /></td>)
        }  
        return playerCells
    }
    function buildCells(rowNum, color) {
        let cells = []
        for (let i = 1; i <= players; i++) {
            let cellId = `cell${i}-row${rowNum}`
            let inputId = cellId + "-input"
            cells.push(<td style={{width: playersStylePercent, backgroundColor: color}} key={cellId} id={cellId}><input type="number" id={inputId} onChange={update} style={{maxWidth: "100%"}} /></td>)
        }
        return cells
    }
    function buildSums(rowNum) {
        let sumCells = []
        for (let i = 1; i <= players; i++) {
            let cellId = `cell${i}-row${rowNum}`
            sumCells.push(<td style={sumStyle} className="finalScores" key={cellId} id={cellId}>{playerTotals[i-1]}</td>)
        }
        return sumCells
    }
    
    useEffect(() => {
        let playerSum = 0
        let newTotals = Array(players).fill(0)
        console.log(`new totals: ${newTotals}`)
        for (let i=0; i<players; i++) {
            playerSum = 0
            for (let j=0; j<8; j++) {
                if(playerScores[i][j] > 0) {
                    playerSum += playerScores[i][j]
                }
                console.log(`reading: ${playerScores[i][j]}`)
            }
            newTotals[i] = playerSum
        }
        setPlayerTotals(newTotals)

    }, [playerScores])
    
    return(
        <div>
            <div id="wholeBox">
            <table id="scoreTable">
                <tbody>
                    <tr>{buildNames()}</tr>
                    <tr>
                        <td className="icons"><img src={red} style={imgStyle}/></td>
                        {buildCells(1, "#ffd9d9")}          
                    </tr>
                    <tr className="board">
                        <td className="icons"><img src={coin} style={imgStyle}/></td>
                        {buildCells(2, "#ffffff")}          
                    </tr>
                    <tr className="board">
                        <td className="icons"><img src={wonders} style={imgStyle}/></td>
                        {buildCells(3, "#ffffff")}          
                    </tr>
                    <tr className="board">
                        <td className="icons"><img src={blue} style={imgStyle}/></td>
                        {buildCells(4, "#d1d4ff")}          
                    </tr>
                    <tr className="board">
                        <td className="icons"><img src={yellow} style={imgStyle}/></td>
                        {buildCells(5, "#feffd1")}          
                    </tr>
                    <tr className="board">
                        <td className="icons"><img src={purple} style={imgStyle}/></td>
                        {buildCells(6, "#fad1ff")}          
                    </tr>
                    <tr className="board">
                        <td className="icons"><img src={green} style={imgStyle}/></td>
                        {buildCells(7, "#d1ffd6")}          
                    </tr>
                    <tr className="board">
                        <td className="icons"><img src={sum} style={imgStyle}/></td>
                        {buildSums(8)}          
                    </tr>
                </tbody>
            </table>
            </div>
            <Link to='/'>Back to main screen</Link>
        </div>

    )
}