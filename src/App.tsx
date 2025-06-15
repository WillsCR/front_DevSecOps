import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'

function App() {

  return (
    <BrowserRouter>
      <div className='min-h-screen bg-blue-300 flex items-center justify-center'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
