import axios from "axios";
import React, { createContext, useContext, useState } from "react";

type LoginType = {
    email: string;
    password: string;
}

interface ProviderProps {
    user:  string | null,
    token:  string,
    login (data: LoginType ): void,
    logout() :void,
}

const AuthContext = createContext<ProviderProps>({
    user: null,
    token: '',
    login: () => {},
    logout: () => {}
});

const AuthProvider = ({ children } : {children: React.ReactNode}) => {
  const storedInfo =  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null
    const [user, setUser ] = useState<string | null>(storedInfo?.email);
    const [ token, setToken ] = useState( storedInfo?.token || '');

    const login = (data: LoginType) => {
      axios.post("https://localhost:7174/login", data).then(response => {
          const obj = {email: data.email, token: response.data.accessToken, refreshToken: response.data.refreshToken};
          setUser(data.email);
          setToken(response.data.accessToken);
          localStorage.setItem('user',JSON.stringify(obj));
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
          window.location.href = '/';
      });
    };

    const logout = () => {
      setUser(null)
      setToken('')
      localStorage.removeItem('user')
      delete axios.defaults.headers.common['Authorization'];
  }

  return (
    <AuthContext.Provider value={{user, token, login, logout}}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;