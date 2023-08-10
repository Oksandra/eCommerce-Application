import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import './_loginForm.scss';
import { checkLogin } from './checkLogin';

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
  const [loginError, setLoginError] = useState<string>('');

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });

    if (name === 'login') {
      setLoginError(checkLogin(value));
    }
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
      {!!loginError && <span className="login-form__error">{loginError}</span>}
      <span className="login-form__title">Pasword:</span>
      <div className="login-form__password-wrap">
        <input
          name="password"
          type={typePassword ? 'text' : 'password'}
          className="login-form__input"
          placeholder="Enter your password"
          value={loginForm.password}
          onChange={handleChange}
        />
        <button
          className="login-form__password-btn"
          type="button"
          onClick={(): void => setTypePassword(!typePassword)}
        >
          {typePassword ? 'Hide' : 'Show'} Password
        </button>
      </div>
      <button
        className="login-form__submit-btn"
        type="submit"
        onClick={(event: FormEvent<HTMLButtonElement>): void =>
          event.preventDefault()
        }
      >
        Log in
      </button>
    </form>
  );
};
