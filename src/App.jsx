import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './assets/Components/Home'
import Transaction from './assets/Components/Transaction'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transaction" element={<Transaction />} />
      </Routes>
    </>
  )
}

export default App
