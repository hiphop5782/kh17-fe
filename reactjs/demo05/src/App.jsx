import { useState } from 'react'
import './App.css'

function App() {
  const [amount, setAmount] = useState(0);

  return (
    <>
      <h1>이체금액 입력화면</h1>
      
      {/* <div>{amount}</div> */}
      <input value={amount} readOnly/>

      <br/>
      
      <button onClick={()=>setAmount(amount+10000)}>만</button>
      <button onClick={()=>setAmount(amount+1000)}>천</button>
      <button onClick={()=>setAmount(amount+100)}>백</button>
      <button onClick={()=>setAmount(amount+10)}>십</button>
      <button onClick={()=>setAmount(amount+1)}>일</button>
      <button onClick={()=>setAmount(parseInt(amount/10))}>한자리지우기</button>
      <button onClick={()=>setAmount(0)}>다지우기</button>
    </>
  )
}

export default App
