import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import firebase from 'firebase/compat/app'
import auth from 'scripts/auth'

type UserContextValue = {
  loading: boolean
  logout: () => void
  signedIn: boolean
}

import { ParsedFirebaseUser } from 'types/firebase'
const UserContext = createContext({} as UserContextValue)

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<ParsedFirebaseUser | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    auth.onAuthStateChanged((response) => {
      if (!response && !!user) setUser(null)
      if (response && !user) parseUser(response)
      setLoading(false)
    })
  }, [])

  const parseUser = useCallback((data: firebase.User) => {
    const { displayName, email, emailVerified, uid, photoURL } = data
    setUser({ displayName, email, emailVerified, uid, photoURL })
  }, [])

  const logout = () => {
    auth.signOut().catch((error) => console.error(error))
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ signedIn: !!user, logout, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)

