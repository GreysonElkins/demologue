import { createContext, useContext, useEffect, useState } from 'react'
import User from 'types/User.d'
import { getUserByUid, getUsersByUids } from 'scripts/api/demologue/query/user'
import { useViewer } from './Viewer'

export type UserMap = {
  [key: string]: User
}

type UsersContextValue = {
  checkForUser: (id: string) => void
  checkForUsers: (ids: string[]) => void
  users: UserMap
  userLoading: boolean
}

const UsersContext = createContext({} as UsersContextValue)

export const UsersProvider: React.FC = ({ children }) => {
  const [users, setUsers] = useState<UserMap>({})
  const [userLoading, setUserLoading] = useState<boolean>(false)
  const [missingUser, setMissingUser] = useState<string | null>(null)
  const [missingUsers, setMissingUsers] = useState<string[] | null>(null)
  const { data: fetchedUser, refetch: refetchUser } = getUserByUid(missingUser)
  const { data: fetchedUsers, refetch: refetchUsers } = getUsersByUids(missingUsers)
  const { user: viewer } = useViewer()

  useEffect(() => {
    if (!viewer) return
    addUserToState(viewer)
  }, [viewer])

  useEffect(() => { 
    if (missingUser) refetchUser() 
    !userLoading && setUserLoading(true)
  }, [missingUser])
  // will this run FETCH twice on first render?

  useEffect(() => { 
    if (missingUsers) refetchUsers() 
    !userLoading && setUserLoading(true)
  }, [missingUsers])
  // will this run FETCH twice on first render?

  useEffect(() => {
    if (fetchedUser) addUserToState(new User(fetchedUser))
    userLoading && setUserLoading(false)
  }, [fetchedUser])

  useEffect(() => {
    if (!fetchedUsers || fetchedUsers.length === 0) return
    const newUserMap = fetchedUsers.reduce(
      (map, user) => ({ ...map, [user.uid]: new User(user) }), 
      {} as UserMap
    )
    setUsers(prev => ({ ...prev, ...newUserMap }))
    userLoading && setUserLoading(false)
  }, [fetchedUsers])

  const addUserToState = async (user: User) => {
    setUsers(prev => ({ ...prev, [user.uid]: user }))
  }

  const checkForUser = (uid: string) => {
    const savedUser = users[uid]
    if (!savedUser) setMissingUser(uid)
  }

  const checkForUsers = (uids: string[]) => {
    const missing = uids.filter(uid => !users[uid])
    if (missing.length > 0) setMissingUsers(missing)
  }

  return (
    <UsersContext.Provider value={{ checkForUser, checkForUsers, users, userLoading }}>
      {children}
    </UsersContext.Provider>
  )
}



export const useUsers = <T extends string | string[]>(selection?: T ) => {
  type Match = T extends string ? User : User[]
  const [match, setMatch] = useState<Match | null>(null)
  const { checkForUser, checkForUsers, ...context } = useContext(UsersContext)

  useEffect(() => {
    if (typeof selection === "string") {
      setMatch(context.users[selection] as Match)
    } else if (Array.isArray(selection)) {
      const matches = Object.values(context.users).filter(({ uid }) => selection.includes(uid))
      setMatch(matches as Match)
    }
  }, [JSON.stringify(context.users)])

  useEffect(() => {
    if (typeof selection === "string") { 
      checkForUser(selection)
      context.users[selection] && setMatch(context.users[selection] as Match)
    } else if (Array.isArray(selection)) {
      checkForUsers(selection)
      const matches = Object.values(context.users).filter(({ uid }) => selection.includes(uid))
      setMatch(matches as Match)
    }
  }, [selection])


  return { ...context, match }
}
