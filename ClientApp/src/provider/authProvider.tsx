import axios from "axios";
import React, { createContext, useContext, useState } from "react";

type LoginType = {
  email: string;
  password: string;
}

interface ProviderProps {
  user: string | null,
  token: string,
  getConfig(): any,
  login(data: LoginType): void,
  logout(): void,
}

const AuthContext = createContext<ProviderProps>({
  user: null,
  token: '',
  getConfig: () => { },
  login: () => { },
  logout: () => { }
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const storedInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null
  const [user, setUser] = useState<string | null>(storedInfo?.email);
  const [token, setToken] = useState(storedInfo?.token || '');

  const login = (data: LoginType) => {
    axios.post("https://localhost:7174/login", data).then(response => {
      const expiryTime = Date.now() + response.data.expiresIn * 1000;
      console.log("response", response.data, "expiryTime", expiryTime);
      const obj = { email: data.email, token: response.data.accessToken, refreshToken: response.data.refreshToken, expiryTime: expiryTime };
      setUser(data.email);
      setToken(response.data.accessToken);
      localStorage.setItem('user', JSON.stringify(obj));
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
      window.location.href = '/';
    });
  };

  const refreshToken = () => {
    const storedInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null
    axios.post("https://localhost:7174/refresh-token", { refreshToken: storedInfo.refreshToken }).then(response => {
      const expiryTime = Date.now() + response.data.expiresIn * 1000;
      console.log("refresh token response", response.data, "expiryTime", expiryTime);
      const obj = { email: storedInfo.email, token: response.data.accessToken, refreshToken: response.data.refreshToken };
      setUser(storedInfo.email);
      setToken(response.data.accessToken);
      localStorage.setItem('user', JSON.stringify(obj));
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
      window.location.href = '/';
    });
  };

  const getConfig = () => {
    const storedInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null
    if (storedInfo.expiryTime < Date.now()) {
      refreshToken();
    }
    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  };

  const logout = () => {
    setUser(null)
    setToken('')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization'];
  }

  return (
    <AuthContext.Provider value={{ user, token, getConfig, login, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;