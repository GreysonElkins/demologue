import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { UserProvider } from 'context/User'

import Header from 'components/Header'
import './App.scss'

const queryClient = new QueryClient()

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    <UserProvider>
      <Header />
      <main></main>
    </UserProvider>
  </QueryClientProvider>
)

export default App
