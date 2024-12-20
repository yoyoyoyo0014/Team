import React, { createContext, useState, useEffect } from "react";

// LoginContext 생성
export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  // 애플리케이션이 로드될 때, localStorage에서 로그인 상태를 확인하고 유지
  useEffect(() => {
    const token = localStorage.getItem('loginToken');
    const storedUser = localStorage.getItem('user');
    if (token) {
      setIsLoggedIn(true);
  }
  if (storedUser) {
      setUser(storedUser);
  }
}, []);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;