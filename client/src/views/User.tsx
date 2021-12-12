import { useParams } from 'react-router-dom'
import UserProfile from 'components/Profile/User'
import { useViewer } from 'context/Viewer'
import { useUsers } from 'context/Users'

import Loading from 'style/Icon/Loading'

const User = () => {
  const { userId } = useParams()
  const { user: viewer } = useViewer()
  const { match, userLoading } = useUsers(userId)
  
  if (viewer && !userId || (userId && viewer?.uid === userId)) return <UserProfile user={viewer} />
  if (!viewer || (!match && userLoading)) return <Loading />
  if (!match) return <div>That user wasn't found</div>
  return <UserProfile user={match} />
}

const UserRoute = {
  element: <User />,
  title: 'User Profile',
  exact: false,
  path: '/user/:userId',
}

export const ViewerRoute = {
  element: <User />,
  title: 'Viewer Profile',
  exact: false,
  path: '/user',
}

export default UserRoute
