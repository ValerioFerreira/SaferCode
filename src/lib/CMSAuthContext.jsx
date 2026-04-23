import React, { createContext, useContext, useState } from 'react';

const CMSAuthContext = createContext(null);

export function CMSAuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('safer_admin_token'));

  const login = async (password) => {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const data = await res.json();
    if (res.ok && data.token) {
      setToken(data.token);
      localStorage.setItem('safer_admin_token', data.token);
      return true;
    }
    throw new Error(data.error || 'Autenticação falhou');
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('safer_admin_token');
    window.location.href = '/admin-safer/login';
  };

  return (
    <CMSAuthContext.Provider value={{ token, login, logout }}>
      {children}
    </CMSAuthContext.Provider>
  );
}

export const useCMSAuth = () => useContext(CMSAuthContext);
