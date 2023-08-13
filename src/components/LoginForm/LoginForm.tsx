import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import './_loginForm.scss';
import { checkLogin } from '../../helpers/checkLogin';
import { checkPassword } from '../../helpers/checkPassword';
import { ILoginForm, checkSubmit } from '../../helpers/checkSubmit';

const loginFormInit: ILoginForm = {
  login: '',
  password: '',
};

export const LoginForm: FC = () => {
  const [loginForm, setLoginForm] = useState<ILoginForm>(loginFormInit);
  const [typePassword, setTypePassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });

    if (name === 'login') {
      setLoginError(checkLogin(value));
    } else {
      setPasswordError(checkPassword(value));
    }
  }

  function handleSubmit(e: FormEvent<HTMLButtonElement>): void {
    e.preventDefault();

    if (
      checkSubmit(
        loginError,
        passwordError,
        loginForm,
        setLoginError,
        setPasswordError
      )
    )
      return;

    // TO DO: add API Authentication
    console.log(loginForm);
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
      <span className="login-form__title">Password:</span>
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
      {!!passwordError && (
        <span className="login-form__error">{passwordError}</span>
      )}
      <button
        className="login-form__submit-btn"
        type="submit"
        onClick={handleSubmit}
      >
        Log in
      </button>
      <p className="login-form__text">
        Don❜t have an account?
        <Link className="login-form__link" to="/registration">
          Sign Up
        </Link>
      </p>
    </form>
  );
};
