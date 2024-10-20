import './App.scss'
import Navigation from './Navigation/Navigation.tsx'
import AuthProvider from '../provider/authProvider.tsx'
import Routes from './Navigation/Routes.tsx'
import store from '../redux/store.ts'
import { Provider } from 'react-redux'

function App() {

  return (
    <>
    <Provider store={store}>
      <AuthProvider>
        <Navigation />
        <Routes />
      </AuthProvider>
      </Provider>
    </>
  )
}

export default App
