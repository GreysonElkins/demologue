import Router from 'views'

import Header from 'components/Header'
import Sidebar from 'components/Menu/Sidebar'
import MobileNav from 'components/Menu/MobileNav'
import './App.scss'
import { usePlayer } from 'context/Player'

const App: React.FC = () => {
  const { isMounted } = usePlayer()
  return (
    <>
      <Header />
      <div className="main-wrapper">
        <Sidebar />
        <main className={isMounted ?  "with-player" : "" }>
          <Router />
        </main>
      </div>
      <MobileNav />
    </>
  )
}

export default App
