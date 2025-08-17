'use client';
import type { AuthState, JwtPayload } from '@digital-www-pwa/types';
import cookies from 'js-cookie';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const INITIAL_DATA: AuthState = {
  checking: true,
  isAuthenticated: false,
  backdrop: false,
  jwtPayload: null,
  isOver18: false,
  checkAuth: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  logout: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  enableBackdrop: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
};

export const AuthContext = createContext<AuthState>(INITIAL_DATA);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [checking, setChecking] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [backdrop, setBackdrop] = useState<boolean>(false);
  const [jwtPayload, setJwtPayload] = useState<JwtPayload | null>(null);

  const checkAuth = useCallback(() => {
    async function fetchAuth() {
      setChecking(true);
      const res = await fetch('http://localhost:3000/api/auth', {
        cache: 'no-store',
      });
      setChecking(false);
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        setJwtPayload(data);
        return;
      }
      setIsAuthenticated(false);
      setJwtPayload(null);
    }
    fetchAuth();
  }, []);

  // TODO: Base this off of new auth token response field
  const isOver18 = isAuthenticated;

  const enableBackdrop = useCallback(() => {
    setBackdrop(true);
  }, []);

  const logout = useCallback(() => {
    cookies.remove('token');
    setIsAuthenticated(false);
    setJwtPayload(null);
  }, []);

  const authState = useMemo(
    () => ({
      checking,
      isAuthenticated,
      backdrop,
      jwtPayload,
      isOver18,
      checkAuth,
      logout,
      enableBackdrop,
    }),
    [
      checking,
      isAuthenticated,
      backdrop,
      jwtPayload,
      isOver18,
      checkAuth,
      logout,
      enableBackdrop,
    ]
  );

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
