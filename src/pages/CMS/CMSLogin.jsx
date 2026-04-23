import React, { useState } from 'react';
import { useCMSAuth } from '@/lib/CMSAuthContext';
import { useNavigate } from 'react-router-dom';

export default function CMSLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useCMSAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(password);
      navigate('/admin-safer');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background font-body">
      <div className="w-full max-w-sm bg-card border border-border p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-heading text-foreground mb-6 text-center">SaferCode CMS</h2>
        {error && <p className="text-sm text-destructive mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Senha Administrativa</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-border rounded-lg bg-background px-4 py-2 text-foreground focus:outline-none focus:border-primary"
              required
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
