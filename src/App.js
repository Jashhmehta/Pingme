import React, {lazy} from 'react'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './Client/Pages/Login';

const Home=lazy(()=>import('./Client/Pages/Home'))

const Chat =lazy(()=>import('./Client/Pages/Chat'))
const Groups=lazy(()=>import('./Client/Pages/Groups'))
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>        
        <Route path='/login' element={<Login />}></Route>
        <Route path='/chat/:id' element={<Chat />}></Route>
        <Route path='/groups' element={<Groups />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App