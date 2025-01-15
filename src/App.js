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
      const result = await initializeAuth();
    };

    init();
  }, [initializeAuth]);

  if (initializing) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/home/main" replace /> : <Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>}>
        <Route path="main" element={<Main />} />
        <Route path="usermain" element={<UserMain />} />
        <Route path="backlog" element={<BackLog />} />
        <Route path="feedback" element={<PeerFeedback />} />
        <Route path="sprint" element={<Sprint />} />
        <Route path="kanban" element={<Kanban />} />
        <Route path="burndown" element={<BurnDown />} />
        {/* 다른 라우트들... */}
      </Route>
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
