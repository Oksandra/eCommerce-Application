import { BaseAddress } from '@commercetools/platform-sdk';

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

export interface MyForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  shipping: Address;
  billing: Address;
}

export interface Address {
  street: string;
  city: string;
  postcode: string;
  country: string;
}

export interface Option {
  value: string;
  label: string;
}

export interface ArrayObjectSelectState {
  selectedOption: Option | null;
}

export interface Customer {
  email: string;
  password: string | undefined;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: BaseAddress[];
  shippingAddresses: number[];
  billingAddresses?: number[];
  defaultBillingAddress?: number;
  defaultShippingAddress?: number;
}
export interface UserLogin {
  username: string;
  password: string;
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
