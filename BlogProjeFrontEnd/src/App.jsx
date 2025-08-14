import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Edit from "./pages/Edit"
import Create from "./pages/Create"
import Single from "./pages/Single"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/edit/:id" element={<Edit/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/single/:id" element={<Single/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App