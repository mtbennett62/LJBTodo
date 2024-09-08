import { BrowserRouter, Link, Router } from 'react-router-dom'
import './App.scss'
import Todo from './Todo'
import Settings from './Settings'
import { Routes, Route } from 'react-router-dom'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'

function App() {

  return (
    <>
      <BrowserRouter>
        {/* <div><Link to="/">Home</Link></div>
        <div><Link to="settings">Settings</Link></div> */}
        <NavigationMenu.Root className="NavigationMenuRoot">
          <NavigationMenu.Item>
            <NavigationMenu.Link className='NavigationMenuLink' href='/'>
              Home
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link className='NavigationMenuLink' href='settings'>
              Settings
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.Root>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="settings" element={<Settings />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
