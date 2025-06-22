import '@picocss/pico'
import './App.css'
import { ModalProvider } from './helpers/Modal/ModalProvider.tsx'
import { PostsPage } from './Post/PostsPage.tsx'
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
          <PostsPage />
        </div>
      </ModalProvider>
    </QueryClientProvider>
  )
}

export default App
