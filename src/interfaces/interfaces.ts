export interface ButtonOptions {
  className: string;
  textContent: string;
  type: 'button' | 'submit';
  onClick?: () => void;
}

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
