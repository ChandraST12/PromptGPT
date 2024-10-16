
import './App.css'
import { Header } from './components'
import { useAuth } from './context/AuthContext'
import { Chat, Home, Login, NotFound, Signup } from './pages'
import { Route, Routes } from 'react-router-dom'

function App() {

  console.log(useAuth()?.isLoggedIn)
  const auth = useAuth()
  return (
    <main>
     <Header/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
     
      {auth?.isLoggedIn && auth.user && (
          <Route path="/chat" element={<Chat />} />
        )}
      <Route path="*" element={<NotFound/>}/>
     </Routes>
    </main>
  )
}

export default App
