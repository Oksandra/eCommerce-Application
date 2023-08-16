import { useContext } from 'react';
import { AuthContext } from '../hoc/AuthProvider';
import { AuthContextProps } from '../interfaces/interfaces';

export const useAuth = (): AuthContextProps => {
  return useContext(AuthContext);
};
