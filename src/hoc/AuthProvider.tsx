import React, { useState, createContext, useMemo, ReactNode } from 'react';
import { AuthContextProps, User } from '../interfaces/interfaces';

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  signin: () => {},
  signout: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(
    localStorage.getItem('userWin4ik')
      ? localStorage.getItem('userWin4ik')
      : null
  );

  const signin = (newUser: User, cb: () => void): void => {
    setUser(newUser);
    cb();
  };

  const signout = (cb: () => void): void => {
    setUser(null);
    cb();
  };

  const value = useMemo(() => {
    return { user, signin, signout };
  }, [user]);

  return <AuthContext.Provider value={value}> {children}</AuthContext.Provider>;
};
