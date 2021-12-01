import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'

import { ViewerProvider } from './Viewer'
import { UsersProvider } from './Users'
import { BandsProvider } from './Bands'

const queryClient = new QueryClient()

const Providers: React.FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    <ViewerProvider>
      <UsersProvider>
        <BandsProvider>
          {children}
          <ToastContainer position="bottom-right" draggable theme="dark" />
        </BandsProvider>
      </UsersProvider>
    </ViewerProvider>
  </QueryClientProvider>
)

export default Providers
