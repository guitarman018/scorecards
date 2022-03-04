import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import "./scoresdiv.css"

import red from "../images/1-red.jpg"
import coin from "../images/2-coin.jpg"
import wonders from "../images/3-wonders.jpg"
import blue from "../images/4-blue.jpg"
import yellow from "../images/5-yellow.jpg"
import purple from "../images/6-purple.jpg"
import green from "../images/7-green.jpg"
import sum from "../images/8-sum.jpg"

export default function ScoresDiv() {

    let players = 7

    const playersPercent = 80/players
    const playersStylePercent = "" + playersPercent + "%"
    const [playerScores, setPlayerScores] = useState(Array(players).fill(0).map(row => new Array(7).fill(0)))
    const [playerTotals, setPlayerTotals] = useState(Array(players).fill(0))

    const imgStyle = {
        display: "block",
        height: "100%",
        
    }

    const sumStyle = {
        textAlign: "center",
        width: playersStylePercent,
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
        
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
        playerCells.push(<div style={{textAlign: "center", fontFamily: "sans-serif" }}>Names:</div>)
        for (let i = 1; i <= players; i++) {
            playerCells.push(<div className="nameLeft"><input type="text" style={{fontSize: 16, fontFamily: "sans-serif"}} /></div>)
        }  
        return playerCells
    }
    function buildCells(rowNum, color) {
        let cells = []
        for (let i = 1; i <= players; i++) {
            let cellId = `cell${i}-row${rowNum}`
            let inputId = cellId + "-input"
            cells.push(<div style={{width: playersStylePercent, backgroundColor: color}} key={cellId} id={cellId}><input type="number" id={inputId} onChange={update} style={{maxWidth: "100%"}} /></div>)
        }
        return cells
    }
    function buildSums(rowNum) {
        let sumCells = []
        for (let i = 1; i <= players; i++) {
            let cellId = `cell${i}-row${rowNum}`
            sumCells.push(<div style={sumStyle} className="finalScores" key={cellId} id={cellId}>{playerTotals[i-1]}</div>)
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
        <div id="wholePage">
            <div className="topRow">{buildNames}</div>
                    <div className="board">
                        <div className="icons"><img className="stretchImg" src={red} style={imgStyle}/></div>
                        {buildCells(1, "#ffd9d9")}          
                    </div>
                    <div className="board">
                        <div className="icons"><img className="noStretch" src={coin} style={imgStyle}/></div>
                        {buildCells(2, "#ffffff")}          
                    </div>
                    <div className="board">
                        <div className="icons"><img className="noStretch" src={wonders} style={imgStyle}/></div>
                        {buildCells(3, "#ffffff")}          
                    </div>
                    <div className="board">
                        <div className="icons"><img className="stretchImg" src={blue} style={imgStyle}/></div>
                        {buildCells(4, "#d1d4ff")}          
                    </div>
                    <div className="board">
                        <div className="icons"><img className="stretchImg" src={yellow} style={imgStyle}/></div>
                        {buildCells(5, "#feffd1")}          
                    </div>
                    <div className="board">
                        <div className="icons"><img className="stretchImg" src={purple} style={imgStyle}/></div>
                        {buildCells(6, "#fad1ff")}          
                    </div>
                    <div className="board">
                        <div className="icons"><img className="stretchImg" src={green} style={imgStyle}/></div>
                        {buildCells(7, "#d1ffd6")}          
                    </div>
                    <div className="board">
                        <div className="icons"><img className="noStretch" src={sum} style={imgStyle}/></div>
                        {buildSums(8)}          
                    </div>
        </div>
    )

}