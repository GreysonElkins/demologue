import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ViewerProvider } from 'context/Viewer'
import Router from 'views'

import Header from 'components/Header'
import Sidebar from 'components/Menu/Sidebar'
import MobileNav from 'components/Menu/MobileNav'
import './App.scss'

const queryClient = new QueryClient()

const App: React.FC = () => (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
      <ViewerProvider>
        <BrowserRouter>
          <Header />
          <div className="main-wrapper">
            <Sidebar />
            <main>
              <Router />
            </main>
          </div>
          <MobileNav />
        </BrowserRouter>
      </ViewerProvider>
    </QueryClientProvider>
)

export default App
