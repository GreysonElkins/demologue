import { useEffect, useState } from 'react'
import useHideOnPaths from 'hooks/useHideOnPaths'

import './Sidebar.scss'
import BandBar from './BandBar'

const Sidebar: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [selection, setSelection] = useState<"band" | "playlist">("playlist")
  const { isHidden } = useHideOnPaths({
    paths: ['/playlists', '/user', '/search-bands'],
    authRequired: true,
    otherFlags: [loading],
  })

  useEffect(() => {
    const mode = localStorage.getItem('sidebarMode')
    if (mode && mode !== selection && (mode === "band" || mode === "playlist")) setSelection(mode)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (loading) return
    localStorage.setItem('sidebarMode', selection)
  }, [selection])

  return (
    <div className={`Sidebar${(isHidden) ? ' hidden' : ''}`}>
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