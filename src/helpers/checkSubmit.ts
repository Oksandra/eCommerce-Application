export interface ILoginForm {
  login: string;
  password: string;
}

export function checkSubmit(
  loginError: string,
  passwordError: string,
  { login, password }: ILoginForm,
  setLoginError: (mes: string) => void,
  setPasswordError: (mes: string) => void
): boolean {
  if (!login || !password) {
    if (!login) {
      setLoginError('Please enter email.');
    }
    if (!password) {
      setPasswordError('Please enter password.');
    }
    return true;
  }
  if (!!loginError || !!passwordError) return true;
  return false;
}
