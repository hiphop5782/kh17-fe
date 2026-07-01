import { useCallback, useState } from "react"
import './App.css'
import Jumbotron from "./components/Jumbotron"//.jsx 생략
import Exam01 from "./components/Exam01"

function App() {

  

  return (
  <div className="container my-5">

    <Exam01/>

    <hr/>

    {/* <Exam02/> */}

  </div>
  )
}

export default App
