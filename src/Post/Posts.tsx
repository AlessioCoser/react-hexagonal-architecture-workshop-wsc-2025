import { useUserSession } from '../User/UserSessionHook.tsx'
import { useState } from 'react'

export function Posts() {
  const { loading } = useUserSession()
  const [count, setCount] = useState(0)

  if (loading) {
    return <></>
  }

  return (
    <article>
      <header>
        <h3>Hexagonal Architecture</h3>
      </header>
      <div>
        <button onClick={handleClick}>count is {count}</button>
      </div>
    </article>
  )

  function handleClick() {
    setCount(count => count + 1)
  }
}
