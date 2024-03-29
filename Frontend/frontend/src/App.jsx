import './App.css'
import {Route,Routes} from "react-router-dom";
import Login from "./Components/Login.jsx";
import Registration from "./Components/Registration.jsx";
import Main from "./Components/Main.jsx";
function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Registration/>} />
        <Route path="/main" element={<Main/>} />
      </Routes>
    </>
  )
}

export default App
