import './App.css'
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login.jsx";
import Registration from "./Components/Registration.jsx";
import Main from "./Components/Main.jsx";
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import { useState } from 'react';
function App() {
  const [user, setUser] = useState(false);
  const login = () => {
    setUser(true);
  }
  const logout = () => {
    setUser(false);
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Login login={login} />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/main" element={
          <ProtectedRoute user={user}>
            <Main logout={logout} />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App


