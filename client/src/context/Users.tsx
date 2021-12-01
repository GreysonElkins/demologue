import { createContext, useContext, useEffect, useState } from 'react'
import User from 'types/User'
import { getUser as fetchUser } from 'scripts/api/demologue/query/user'
import { useViewer } from './Viewer'
// import { toast } from 'react-toastify'

type UsersContextValue = {
  getUser: (uid: string) => Promise<User | undefined>
}

const UsersContext = createContext({} as UsersContextValue)

export const UsersProvider: React.FC = ({ children }) => {
  const [fetchUserId, setFetchUser] = useState<string | null>(null)
  const [users, setUsers] = useState<{ [key: string]: User }>({})
  const {
    status: userStatus,
    data: userData,
    error: userError,
    isFetching: fetchingUser,
  } = fetchUser(fetchUserId)
  const { user: viewer } = useViewer()

  useEffect(() => {
    if (!viewer) return
    addUserToState(viewer)
  }, [viewer])

  const getUser = async (uid: string, count = 0) => {
    const user = users[uid]
    if (user) return user
    fetchUserId !== uid && setFetchUser(uid) // triggers a fetch call
    if (userData && userStatus === 'success') {
      // prolly not fast enough
      const result = new User(userData)
      setFetchUser(null)
      setUsers((prev) => ({ ...prev, [uid]: result }))
      return result
    } else if (count > 3) {
      console.error(`Something went wrong getting a user: ${userError}`)
    } else if (fetchingUser) {
      setTimeout(() => {
        return getUser(uid, count + 1)
      }, 500)
    }
  }

  const addUserToState = async (user: User) => {
    setUsers(prev => ({ ...prev, [user.uid]: user }))
  }

  return (
    <UsersContext.Provider value={{ getUser }}>
      {children}
    </UsersContext.Provider>
  )
}

export const useUsers = () => useContext(UsersContext)
