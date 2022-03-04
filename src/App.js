import React from "react"
import { useNavigate, Routes, Route } from "react-router-dom"
import Players from "./components/players.js"
import Scores from "./components/scores.js";
import ScoresDiv from "./components/scoresdiv.js";

export default function App() {

  return(
    <div>
      <Routes>
        <Route path="/" element={<Players />} />
        <Route path="/scores" element={<Scores />} />
        <Route path="/scoresdiv" element={<ScoresDiv />} />
      </Routes>
    </div>
  )
}

