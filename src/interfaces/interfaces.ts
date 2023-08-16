export interface ButtonOptions {
  className: string;
  textContent: string;
  type: 'button' | 'submit';
  onClick?: () => void;
}

export interface AuthContextProps {
  user: User;
  signin: (newUser: User, cb: () => void) => void;
  signout: (cb: () => void) => void;
}

export type User = string | null;
