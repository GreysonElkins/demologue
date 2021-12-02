import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import auth from 'scripts/auth'
import User from 'types/User.d'
import { getUserByUid } from 'scripts/api/demologue/query/user'
import { useCreateUser } from 'scripts/api/demologue/mutation/user'
// import { toast } from 'react-toastify'

type ViewerContextValue = {
  loading: boolean
  logout: () => void
  signedIn: boolean
  user: User | null
}

const ViewerContext = createContext({} as ViewerContextValue)

export const ViewerProvider: React.FC = ({ children }) => {
  const [uid, setUid] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const { status, data, isFetching } = getUserByUid(uid)
  const { mutate: createUser } = useCreateUser()
  
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    auth.onAuthStateChanged((response) => {
      if (!response && !!user) setUser(null)
      if (response && !user) setUid(response.uid)
    })
  }, [])

  useEffect(() => {
    if (status === 'success' && uid) {
      parseUserFromAuth()
    } 
    setLoading(false)
  }, [status, data, isFetching, uid])

  const parseUserFromAuth = useCallback(async () => {
    let viewer
    if (status === 'success' && !isFetching && !data && !!uid && auth.currentUser) {
      const { displayName, email, emailVerified, uid, photoURL } = auth.currentUser
      viewer = await createUser({ displayName, email, emailVerified, uid, photoURL })
      // THIS GQL should be updated to return the whole user...I don't know how it's working currently...
    } else if (auth.currentUser && data) {
      viewer = new User(data)
    }
    viewer ? setUser(viewer) : console.error("something went wrong")
    setLoading(false)
  }, [status, data, isFetching, uid])

  const logout = () => {
    auth.signOut().catch((error) => console.error(error))
    setUser(null)
  }

  return (
    <ViewerContext.Provider value={{ signedIn: !!user, user, logout, loading }}>
      {children}
    </ViewerContext.Provider>
  )
}

export const useViewer = () => useContext(ViewerContext)

