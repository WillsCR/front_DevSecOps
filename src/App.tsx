import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/context/ProtectedRoute';

import LoadingScreen from '@/components/LoadingScreen';
import Login from '@/components/Login';
import Register from '@/components/Register';

const Home = lazy(() => import('@/components/Home'));

function App() {

  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<LoadingScreen/>}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route element={<ProtectedRoute/>}>
              <Route path='/home' element={<Home />} />
            </Route>
            <Route path="*" element={<div>Parece que te perdiste...</div>} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  )
}

export default App
