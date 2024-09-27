import './App.scss'
import Navigation from './Navigation'
import AuthProvider from './provider/authProvider'
import Routes from './routes'

function App() {

  return (
    <>
      <AuthProvider>
        <Navigation />
        <Routes />
      </AuthProvider>
    </>
  )
}

export default App
