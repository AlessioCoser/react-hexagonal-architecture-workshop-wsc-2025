import { useUserSession } from '../User/UserSessionHook.ts'
import qmatesLogo from '../assets/qmates.svg'

export function Navigation() {
  const { loading, user } = useUserSession()

  return (
    <nav className="container">
      <ul>
        <li>
          <img src={qmatesLogo} className="logo" alt="QMates logo" />
        </li>
      </ul>
      <ul>
        <li>{!loading && <span>{user.name}</span>}</li>
      </ul>
    </nav>
  )
}