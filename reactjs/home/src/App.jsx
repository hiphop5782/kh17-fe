import { Route, Routes } from "react-router-dom"
import './App.css'
import Header from "./templates/Header"
import Menu from "./templates/Menu"
import Body from "./templates/Body"
import Footer from "./templates/Footer"

export default function App() {

  return (
    <>
      <Header/>
      <Menu/>
      <Body/>
      <Footer/>
    </>
  )
}
