import React, { useEffect } from "react";
import { useUser } from "../hooks/useAuth";
import { useToken } from "../hooks/useToken";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setLoading, setUser } = useUser();
  const { setToken } = useToken();
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedToken && savedUser) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
    setLoading(false);
  }, [setLoading, setToken, setUser]);
  return <>{children}</>;
};
