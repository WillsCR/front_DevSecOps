import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  loading: boolean;
  logout: () => void;
  checkAuth: () => void;
  id: number;
  userName: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<number>(-1);
  const [userName, setuserName] = useState<string>('');
  const navigate = useNavigate();

  const checkAuth = () => {
    setLoading(true);
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
        const isTokenValid = decodedToken?.exp * 1000 > Date.now();
        if (!isTokenValid) {
          logout();
        } else {
          setId(decodedToken.sub);
          setuserName(decodedToken.userName);
        }
      } catch (e) {
        logout();
      }
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.clear();
    setId(-1);
    setuserName('');
    setLoading(false);
    navigate('/');
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ loading, logout, checkAuth, id, userName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
