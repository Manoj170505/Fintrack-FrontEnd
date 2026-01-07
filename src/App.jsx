import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './assets/Components/Landing'
import Login from './assets/Components/Login'
import Register from './assets/Components/Register'
import Home from './assets/Components/Home'
import Transaction from './assets/Components/Transaction'
import Analytics from './assets/Components/Analytics'
import Reminders from './assets/Components/Reminders'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const session = localStorage.getItem('fintrack_session');

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/transaction" element={
          <ProtectedRoute>
            <Transaction />
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        } />
        <Route path="/reminders" element={
          <ProtectedRoute>
            <Reminders />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
