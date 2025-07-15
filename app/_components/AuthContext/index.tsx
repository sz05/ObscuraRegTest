"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
type AuthContext = {
  isAuth: boolean;
  isAuthenticatedLoaded: boolean;
};

const initValue: AuthContext = {
  isAuth: false,
  isAuthenticatedLoaded: false,
};

const AuthContext = createContext<AuthContext>(initValue);

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticatedLoaded, setIsAuthenticatedLoaded] = useState(false);

  const checkVerify = async () => {
    try {
      setIsAuthenticatedLoaded(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/verify`, {
        credentials: "include",
      });
      const data = await res.json();
      setIsAuthenticated(data.valid);
    } catch {
      alert("Failed to verify registration.");
      setIsAuthenticated(false);
    } finally {
      setIsAuthenticatedLoaded(false);
    }
  };

  useEffect(() => {
    checkVerify();
  }, []);

  const value = useMemo(
    () => ({ isAuth: isAuthenticated, isAuthenticatedLoaded }),
    [isAuthenticated, isAuthenticatedLoaded]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
