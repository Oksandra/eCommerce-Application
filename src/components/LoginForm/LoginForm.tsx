import React, { ChangeEvent, FC, FormEvent, useState } from 'react';

interface ILoginForm {
  login: string;
  password: string;
}

const loginFormInit: ILoginForm = {
  login: '',
  password: '',
};

export const LoginForm: FC = () => {
  const [loginForm, setLoginForm] = useState<ILoginForm>(loginFormInit);
  const [typePassword, setTypePassword] = useState<boolean>(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  }

  return (
    <form className="login-form">
      <span className="login-form__title">Login:</span>
      <input
        name="login"
        type="text"
        className="login-form__input"
        placeholder="Enter your email"
        value={loginForm.login}
        onChange={handleChange}
      />
      <span className="login-form__title">Pasword:</span>
      <input
        name="password"
        type={typePassword ? 'text' : 'password'}
        className="login-form__input"
        placeholder="Enter your password"
        value={loginForm.password}
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={(): void => setTypePassword(!typePassword)}
      >
        Show Password
      </button>
      <button
        type="submit"
        onClick={(event: FormEvent<HTMLButtonElement>): void =>
          event?.preventDefault()
        }
      >
        Log in
      </button>
    </form>
  );
};
