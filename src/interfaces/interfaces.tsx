export interface MyForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: Address;
}

export interface Address {
  street: string;
  city: string;
  postcode: string;
  country: string;
}
