import '@picocss/pico'
import { useState } from 'react'
import qmatesLogo from './assets/qmates.svg'
import './App.css'
import { ModalProvider } from './helpers/Modal/ModalProvider.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ModalProvider>
      <header className="top-bar">
        <nav className="container">
          <ul>
            <li>
              <img src={qmatesLogo} className="logo" alt="QMates logo" />
            </li>
          </ul>
          <ul>
            <li></li>
          </ul>
        </nav>
      </header>
      <div className="container page">
        <article className="wall">
          <header>
            <h3>Hexagonal Architecture</h3>
          </header>
          <div>
            <button onClick={handleClick}>count is {count}</button>
          </div>
        </article>
      </div>
    </ModalProvider>
  )

  function handleClick() {
    setCount(count => count + 1)
  }
}

export default App
