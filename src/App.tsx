import '@picocss/pico'
import './App.css'
import { ModalProvider } from './helpers/Modal/ModalProvider.tsx'
import { Posts } from './Post/Posts.tsx'
import { Navigation } from './helpers/Navigation.tsx'

function App() {
  return (
    <ModalProvider>
      <header className="top-bar">
        <Navigation />
      </header>
      <div className="container page">
        <Posts />
      </div>
    </ModalProvider>
  )
}

export default App
