'use client'

import * as React from 'react';

interface LoginUserContextValue {
  loginUser: string | null;
  setLoginUser: React.Dispatch<React.SetStateAction<string | null>>;
  isLogined: boolean;
  setIsLogined: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginUserContext = React.createContext<LoginUserContextValue>({
  loginUser: null,
  setLoginUser: () => {},
  isLogined: false,
  setIsLogined: () => {},
});

interface LoginUserProviderProps {
  children: React.ReactNode;
}

export const LoginUserProvider: React.FC<LoginUserProviderProps> = (props) => {
  const { children } = props;
  const [loginUser, setLoginUser] = React.useState<string | null>(null);
  const [isLogined, setIsLogined] = React.useState<boolean>(false);

  return (
    <LoginUserContext.Provider
      value={{ loginUser, setLoginUser, isLogined, setIsLogined }}
    >
      {children}
    </LoginUserContext.Provider>
  );
};