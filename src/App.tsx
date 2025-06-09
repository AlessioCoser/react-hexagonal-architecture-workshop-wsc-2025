import { useState } from 'react'
import qmatesLogo from './assets/qmates.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <img src={qmatesLogo} className="logo qmates" alt="QMates logo" />
      </div>
      <h1>Hexagonal Architecture</h1>
      <div className="card">
        <button onClick={handleClick}>count is {count}</button>
      </div>
    </>
  )

  function handleClick() {
    setCount(count => count + 1)
  }
}

export default App
