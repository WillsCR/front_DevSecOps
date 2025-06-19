import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Notas from './components/Notas'

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/notas' element={<Notas />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
