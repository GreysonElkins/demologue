
import Providers from 'context'
import Router from 'views'

import Header from 'components/Header'
import Sidebar from 'components/Menu/Sidebar'
import MobileNav from 'components/Menu/MobileNav'
import './App.scss'

const App: React.FC = () => (
  <Providers>
    <Header />
    <div className="main-wrapper">
      <Sidebar />
      <main>
        <Router />
      </main>
    </div>
    <MobileNav />
  </Providers>
)

export default App
