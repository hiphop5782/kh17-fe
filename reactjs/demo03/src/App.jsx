import { useState } from 'react';
import './App.css'

//리액트는 화면 뒤에 데이터(state)가 숨어있다고 생각
//그 데이터의 상태에 따라 화면이 완성된다고 믿음
//데이터를 만들고 이를 화면에 연결하는게 리액트의 핵심작업
function App() {
  //state : 화면의 근원이 되는 데이터
  //- 생성 : const [변수명, 세터함수명] = useState(초기값);
  const [name, setName] = useState("피카츄");

  return (
    <>
      <h1>Hello~ {name}!</h1>
      <button onClick={()=>setName("피카츄")}>피카츄</button>
      <button onClick={()=>setName("라이츄")}>라이츄</button>
    </>
  )
}

export default App
