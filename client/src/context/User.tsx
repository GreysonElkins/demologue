import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import firebase from 'firebase/compat/app'
import auth from 'scripts/auth'
import { ParsedFirebaseUser } from 'types/firebase'
import { getUser } from 'scripts/api/demologue/query/user'
import UserMutations from 'scripts/api/demologue/mutation/user'

type UserContextValue = {
  loading: boolean
  logout: () => void
  signedIn: boolean
}

const UserContext = createContext({} as UserContextValue)

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<ParsedFirebaseUser | null>(null)
  const { status, data, isFetching } = getUser(user?.uid)
  const { createUser } = UserMutations()
  
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    auth.onAuthStateChanged((response) => {
      if (!response && !!user) setUser(null)
      if (response && !user) parseUser(response)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (status === 'success' && !isFetching && !data && !!user) {
      createUser(user)
    } 
    // else {
    //   checkForUpdates()
    // maybe firebase should JUST be about JWT auth and share it's first set of data
    // updates afterwards will be made in UI and if needed, update firebase as well
    // but column `isVerified` can probably be ignored
    // }
  }, [status, data, isFetching])

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

