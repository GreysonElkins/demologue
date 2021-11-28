import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useUser } from 'context/User'
import RouteInfo from 'types/Route'
import Loading from 'style/Icon/Loading'

import Home from './Home'
import Bands from './Bands'

export const pages: RouteInfo[] = [Home, Bands]

const Router: React.FC = () => {
  const [mappedRoutes, setMappedRoutes] = useState<JSX.Element[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { signedIn, loading: userLoading } = useUser()

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
  }, [userLoading])

  useEffect(() => {
    if (mappedRoutes.length < 1) return
    setLoading(false)
  }, [mappedRoutes])

  if (loading) return <Loading size="100px"/>

  return <Routes>{mappedRoutes}</Routes>
}

export default Router
