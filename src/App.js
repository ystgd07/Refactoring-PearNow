import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import Home from './pages/Home';
import Sprint from './pages/Sprint';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Kanban from './pages/Kanban';
import BackLog from './pages/BackLog';
import PjtDetail from './pages/PjtDetail';
import UserMain from './pages/UserMain';
import Feedback from './pages/Feedback';
import PeerFeedback from './pages/PeerFeedback';
import BurnDown from './pages/BurnDown';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useAuthStore } from './store/AuthStore/authStore';
import PrivateRoute from './utils/PrivateRoute';

const queryClient = new QueryClient();

function AppRoutes() {
  const initializeAuth = useAuthStore(state => state.initializeAuth);
  const { isAuthenticated, initializing } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    const init = async () => {
      console.log('=== Page Load/Refresh Detection ===');
      console.log('Current localStorage state:', {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
      });

      console.log('Starting auth initialization...');
      const result = await initializeAuth();
      console.log('Auth initialization result:', result);
    };

    init();
  }, [initializeAuth]);

  // 초기화 중에는 로딩 표시
  if (initializing) {
    console.log('App is in initializing state');
    return <div>Loading...</div>;
  }

  console.log('App render with auth state:', { isAuthenticated, initializing });

  return (
    <Routes>
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/home/main" replace /> : <Login />} 
      />
      <Route 
        path="/signup" 
        element={<SignUp />} 
      />
      <Route 
        path="/home/*" 
        element={<PrivateRoute><Home /></PrivateRoute>} 
      />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
