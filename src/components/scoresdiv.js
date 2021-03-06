import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./scoresdiv.css"

import red from "../images/1-red.jpg"
import coin from "../images/2-coin.jpg"
import wonders from "../images/3-wonders.jpg"
import blue from "../images/4-blue.jpg"
import yellow from "../images/5-yellow.jpg"
import purple from "../images/6-purple.jpg"
import green from "../images/7-green.jpg"
import sum from "../images/8-sum.jpg"
import { Navigate } from "react-router-dom";

export default function ScoresDiv() {

    const navigate = useNavigate();

    let gotten = localStorage.getItem("numPlayers")
    let numGotten = parseInt(gotten)
    let players = numGotten


    const [playerScores, setPlayerScores] = useState(Array(players).fill(0).map(row => new Array(7).fill(0)))
    const [playerTotals, setPlayerTotals] = useState(Array(players).fill(0))

    const sumStyle = {
        textAlign: "center",
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto"   
    }

    function update(e){
        
        let idString = e.target.id
        let rowGet = idString.charAt(4)
        let colGet = idString.charAt(9)
        let copy = playerScores
        if(e.target.value >= 0){
            copy[rowGet-1][colGet-1] = parseInt(e.target.value)
            console.log(`value is ${parseInt(e.target.value)}`)
        } else if (e.target.value < 0){
            copy[rowGet-1][colGet-1] = parseInt(e.target.value)
            console.log(`value is ${parseInt(e.target.value)}`)
        } 
        setPlayerScores(copy)
        
        
        // Update totals:
        let playerSum = 0
        let newTotals = Array(players).fill(0)
        for (let i=0; i<players; i++) {
            playerSum = 0
            for (let j=0; j<8; j++) {
                if(playerScores[i][j] > 0 && playerScores[i][j] != "") {
                    playerSum += playerScores[i][j]
                } else if(playerScores[i][j] <= 0 && playerScores[i][j] != "") {
                    playerSum += playerScores[i][j]
                }
            }
            newTotals[i] = playerSum
        }
        setPlayerTotals(newTotals)
    }

    function makeSure() {
        if (window.confirm("Are you sure you want to leave the game?")) {
            navigate('/')
        } else {
            console.log('staying')
        }
    }

    function buildNames() {
        let playerCells = []
        for (let i = 1; i <= players; i++) {
            playerCells.push(<div className="innerDiv"><input type="text" className="textName" autoComplete="new-password"/></div>)
        }  
        return playerCells
    }
    function buildCells(rowNum, color) {
        let cells = []
        
        for (let i = 1; i <= players; i++) {
            let cellId = `cell${i}-row${rowNum}`
            let inputId = cellId + "-input"
            cells.push(<div className="innerDiv" style={{backgroundColor: color}} key={cellId} id={cellId}><input type="number" className="scoreInput" autoComplete="new-password" id={inputId} onChange={update} style={{maxWidth: "100%"}} /></div>)
        }
        return cells
    }
    function buildSums(rowNum) {
        let sumCells = []
        for (let i = 1; i <= players; i++) {
            let cellId = `cell${i}-row${rowNum}`
            sumCells.push(<div style={sumStyle} className={`finalScores innerDiv`} key={cellId} id={cellId}>{playerTotals[i-1]}</div>)
        }
        return sumCells
    }

    useEffect(() => {
        let playerSum = 0
        let newTotals = Array(players).fill(0)
        for (let i=0; i<players; i++) {
            playerSum = 0
            for (let j=0; j<8; j++) {
               
                if(playerScores[i][j] > 0) {
                    playerSum += playerScores[i][j]
                }  else if(playerScores[i][j] < 0) {
                    playerSum += playerScores[i][j]
                }
                // console.log(`reading: ${playerScores[i][j]}`)
            }
            newTotals[i] = playerSum
        }
        setPlayerTotals(newTotals)
    }, [playerScores])

    return(
        <div id="wholePage">
            <div className="board">
                <div style={{border: "2px solid black", textAlign: "center", fontFamily: "sans-serif", width: "17%", display: "flex", justifyContent: "center", fontSize: '3vw'}}>
                    <p style={{margin: "auto 0"}}>Names:</p>
                </div>
                <div className="cellsContainer">{buildNames()}</div>
            </div>
                    <div className="board">
                        <div className="icons" style={{backgroundImage: "url(" + red + ")"}}></div>
                        <div class="cellsContainer">{buildCells(1, "#ffd9d9")}</div>
                    </div>
                    <div className="board">
                        <div className="iconsNoStretch" style={{display: "flex", justifyContent: "center"}}><img className="noStretch" src={coin}/></div>
                        <div class="cellsContainer">{buildCells(2, "#ffffff")}</div>          
                    </div>
                    <div className="board">
                        <div className="iconsNoStretch" style={{display: "flex", justifyContent: "center"}}><img className="noStretch" src={wonders}/></div>
                        <div class="cellsContainer">{buildCells(3, "#ffffff")}</div>          
                    </div>
                    <div className="board">
                    <div className="icons" style={{backgroundImage: "url(" + blue + ")"}}></div>
                        <div class="cellsContainer">{buildCells(4, "#d1d4ff")}</div>          
                    </div>
                    <div className="board">
                        <div className="icons" style={{backgroundImage: "url(" + yellow + ")"}}></div>
                        <div class="cellsContainer">{buildCells(5, "#feffd1")}</div>          
                    </div>
                    <div className="board">
                    <div className="icons" style={{backgroundImage: "url(" + purple + ")"}}></div>
                        <div class="cellsContainer">{buildCells(6, "#fad1ff")}</div>          
                    </div>
                    <div className="board">
                    <div className="icons" style={{backgroundImage: "url(" + green + ")"}}></div>
                        <div class="cellsContainer">{buildCells(7, "#d1ffd6")}</div>          
                    </div>
                    <div className="board">
                        <div className="icons" style={{backgroundColor: "#000", display: "flex", justifyContent: "center"}}><img className="noStretch" src={sum}/></div>
                        <div class="cellsContainer">{buildSums(8)}</div>          
                    </div>
                    <div className="divButton">
                         <button className="button-default" onClick={makeSure}>Exit game</button>
                    </div>
                    
        </div>
    )

}