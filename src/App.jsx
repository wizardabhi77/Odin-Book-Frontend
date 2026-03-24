

import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Home from './components/Home.jsx'
import Profile from './components/Profile.jsx'
import Post from './components/Post.jsx'

function App() {
 

  return (

    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/post" element={<Post />}/>
    </Routes>
    
  )
}

export default App
