
import './App.css'
import { Header } from './components'
import { Chat, Home, Login, NotFound, Signup } from './pages'
import { Route, Routes } from 'react-router-dom'

function App() {
  

  return (
    <main>
     <Header/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/chat" element={<Chat/>}/>
      <Route path="*" element={<NotFound/>}/>
     </Routes>
    </main>
  )
}

export default App
