import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { CMSAuthProvider } from '@/lib/CMSAuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Home from './pages/Home';
import Agendar from './pages/Agendar';
import Conteudos from './pages/Conteudos';
import PostSingle from './pages/PostSingle';
import Sobre from './pages/Sobre';
import Cases from './pages/Cases';
import Projetos from './pages/Projetos';

// CMS Imports
import CMSLayout from './pages/CMS/CMSLayout';
import CMSLogin from './pages/CMS/CMSLogin';
import CMSDashboard from './pages/CMS/CMSDashboard';
import CMSProjetos from './pages/CMS/CMSProjetos';
import CMSConteudos from './pages/CMS/CMSConteudos';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/agendar" element={<Agendar />} />
      <Route path="/conteudos" element={<Conteudos />} />
      <Route path="/conteudos/:id" element={<PostSingle />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/cases" element={<Cases />} />
      <Route path="/projetos" element={<Projetos />} />

      {/* Admin CMS */}
      <Route path="/admin-safer/login" element={<CMSLogin />} />
      <Route path="/admin-safer" element={<CMSLayout />}>
        <Route index element={<CMSDashboard />} />
        <Route path="projetos" element={<CMSProjetos />} />
        <Route path="conteudos" element={<CMSConteudos />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <CMSAuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </CMSAuthProvider>
    </AuthProvider>
  )
}

export default App