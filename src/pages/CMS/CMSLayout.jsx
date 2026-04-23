import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useCMSAuth } from '@/lib/CMSAuthContext';
import { LayoutDashboard, FileText, Briefcase, LogOut } from 'lucide-react';

export default function CMSLayout() {
  const { token, logout } = useCMSAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin-safer/login" replace />;
  }

  const links = [
    { name: 'Dashboard', path: '/admin-safer', icon: LayoutDashboard },
    { name: 'Conteúdos', path: '/admin-safer/conteudos', icon: FileText },
    { name: 'Projetos', path: '/admin-safer/projetos', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-background flex font-body">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-heading font-semibold text-foreground">SaferCode</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Admin Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {links.map(l => {
            const active = location.pathname === l.path;
            const Icon = l.icon;
            return (
              <Link
                key={l.name}
                to={l.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {l.name}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 text-sm text-destructive font-medium hover:bg-destructive/10 rounded-lg w-full transition-colors">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-background p-8">
        <Outlet />
      </main>
    </div>
  );
}
