import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useUser } from 'context/User'

import './Sidebar.scss'
import BandBar from './BandBar'

const hideOnPaths = ['/playlists', '/user']

const Sidebar: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [selection, setSelection] = useState<"band" | "playlist">("playlist")
  const [hide, setHide] = useState<boolean>(true)
  const { signedIn } = useUser()
  const { pathname } = useLocation()

  useEffect(() => {
    const mode = localStorage.getItem('sidebarMode')
    if (mode && mode !== selection && (mode === "band" || mode === "playlist")) setSelection(mode)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (hideOnPaths.includes(pathname) && !hide) setHide(true)
    if (!hideOnPaths.includes(pathname) && hide) setHide(false)
  }, [pathname])

  useEffect(() => {
    if (loading) return
    localStorage.setItem('sidebarMode', selection)
  }, [selection])

  return (
    <div className={`Sidebar${(hide || loading || !signedIn) ? ' hidden' : ''}`}>
      <div className="Modes">
        <button
          className={`tab-option ${selection === 'playlist' ? 'active' : ''}`}
          onClick={() => selection !== 'playlist' && setSelection('playlist')}
        >
          playlists
        </button>
        <button
          onClick={() => selection !== 'band' && setSelection('band')}
          className={`tab-option ${selection === 'band' ? 'active' : ''}`}
        >
          bands
        </button>
      </div>
      {selection === "band" && <BandBar />}
      {/* <Cta cta="Two" ico="✚"/> */}
    </div>
  )
}

export default Sidebar