import Header from 'components/Header'
import { UserProvider } from "context/User"
import './App.scss'

const App: React.FC = () => (
  <UserProvider>
    <Header />
    <main></main>
  </UserProvider>
)

export default App
