// import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'

import { ViewerProvider } from './Viewer'
import { UsersProvider } from './Users'
import { BandsProvider } from './Bands'
import { TracksProvider } from './Tracks'
import { PlayerProvider } from './Player'
import { MessagesProvider } from './Messages'

const queryClient = new QueryClient()

const Providers: React.FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {/* {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />} */}
    <ViewerProvider>
      <TracksProvider>
        <UsersProvider>
          <BandsProvider>
            <MessagesProvider>
              <PlayerProvider>
                {children}
                <ToastContainer position="bottom-right" draggable theme="dark" />
              </PlayerProvider>
            </MessagesProvider>
          </BandsProvider>
        </UsersProvider>
      </TracksProvider>
    </ViewerProvider>
  </QueryClientProvider>
)

export default Providers
