import '@picocss/pico'
import './App.css'
import { ModalProvider } from './helpers/Modal/ModalProvider.tsx'
import { Posts } from './Post/Posts.tsx'
import { Navigation } from './helpers/Navigation.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <header className="top-bar">
          <Navigation />
        </header>
        <div className="container page">
          <Posts />
        </div>
      </ModalProvider>
    </QueryClientProvider>
  )
}

export default App
