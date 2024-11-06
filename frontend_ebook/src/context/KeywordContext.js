import React, { createContext, useState, useEffect } from "react";

// LoginContext 생성
export const KeywordContext = createContext();

export const KeywordProvider = ({ children }) => {
  let [keyword, setKeyword] = useState('');

  return (
    <KeywordContext.Provider value={{ keyword, setKeyword }}>
      {children}
    </KeywordContext.Provider>
  );
};

export default KeywordProvider;