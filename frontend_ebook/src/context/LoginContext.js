import React, { createContext, useState, useEffect } from "react";

// LoginContext 생성
export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 애플리케이션이 로드될 때, localStorage에서 로그인 상태를 확인하고 유지
  useEffect(() => {
    const token = localStorage.getItem('loginToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;