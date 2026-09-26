// import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Ticket from './pages/Tickets'
import TicketDetails from './pages/TicketDetail'
import HomePage from './pages/HomePage'
// import Sidebar from './Component/sidebar'



function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
  <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/ticket' element={<Ticket />} />
    <Route path='/ticket/:id' element={<TicketDetails />} />
   {/* <Route path='Sidebar' element={<Sidebar/>} /> */}
  </Routes>
    </>
  )
}

export default App
