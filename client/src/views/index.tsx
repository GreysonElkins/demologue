import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useViewer } from 'context/Viewer'
import RouteInfo from 'types/Route'
import Loading from 'style/Icon/Loading'

import Home from './Home'
import Band from './Band'
import User, { ViewerRoute } from './User'
import SearchBands from './SearchBands'
import Inbox from './Inbox'

export const pages: RouteInfo[] = [Home, Band, User, ViewerRoute, SearchBands, Inbox]

const Router: React.FC = () => {
  const [mappedRoutes, setMappedRoutes] = useState<JSX.Element[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { signedIn, loading: userLoading } = useViewer()

  const mapRoutes = () => {
    const map = pages
      .filter(({ authRequired }) => (signedIn ? true : !authRequired || signedIn))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(({ authRequired, title, inNav, ...props }, i) => <Route key={`Route-${i}`} {...props} />)
    setMappedRoutes(map)
  }

  useEffect(() => {
    if (userLoading) return
    mapRoutes()
  }, [userLoading, signedIn])

  useEffect(() => {
    if (mappedRoutes.length < 1) return
    setLoading(false)
  }, [mappedRoutes])

  if (loading) return <Loading size="100px"/>

  return <Routes>{mappedRoutes}</Routes>
}

export default Router
