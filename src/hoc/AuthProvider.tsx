import React, { useState, createContext, useMemo, ReactNode } from 'react';

interface AuthContextProps {
  user: User;
  signin: (newUser: User, cb: () => void) => void;
  signout: (cb: () => void) => void;
}

type User = string | null;

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  signin: () => {},
  signout: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

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
