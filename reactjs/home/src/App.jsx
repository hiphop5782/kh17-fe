import { Route, Routes } from "react-router-dom"
import './App.css'
import Test01 from "./components/Test01"
import Test02 from "./components/Text02"
import NotFound from "./components/NotFound"
import Home from "./components/Home"

export default function App() {

  return (
    <>
      <h1>Hello~!</h1>

      {/* 주소에 따라 나올 화면을 지정하는 영역 구성 */}
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        {/* /test1 주소일 경우 Test01 화면이 나와야 합니다 */}
        <Route path="/test1" element={<Test01/>}></Route>
        {/* /test2 주소일 경우 Test02 화면이 나와야 합니다 */}
        <Route path="/test2" element={<Test02/>}></Route>
        {/* 위에서 해당되는 주소가 없을 때 NotFound 화면이 나와야 합니다 */}
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </>
  )
}
