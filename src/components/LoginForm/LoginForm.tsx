import React, { ChangeEvent, FormEvent, useState, FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.scss';
import checkLogin from '../../helpers/checkLogin';
import { checkPassword } from '../../helpers/checkPassword';
import { ILoginForm, checkSubmit } from '../../helpers/checkSubmit';
import { useAuth } from '../../hooks/useAuth';
import {
  loginCustomer,
  getMeCustomer,
  loginCustomerAnonimous,
} from '../../api/loginCustomer';

const loginFormInit: ILoginForm = {
  login: '',
  password: '',
};

export const LoginForm: FC = () => {
  const [loginForm, setLoginForm] = useState<ILoginForm>(loginFormInit);
  const [typePassword, setTypePassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const { signin } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<boolean>(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setSubmitError(false);
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

  async function handleSubmit(e: FormEvent<HTMLButtonElement>): Promise<void> {
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
    const token = JSON.parse(
      localStorage.getItem('anonimTokenWin4ik') as string
    );
    if (!token) {
      loginCustomerAnonimous(loginForm.login, loginForm.password)
        .then((resp) => {
          const user: string = resp.body.customer.id;
          signin(user, () => navigate('/', { replace: true }));
          localStorage.setItem('userWin4ik', user);
          localStorage.removeItem('anonimTokenWin4ik');
          localStorage.removeItem('tokenWin4ik');
          getMeCustomer(loginForm.login, loginForm.password);
        })
        .catch(() => {
          setSubmitError(true);
        });
    }
    loginCustomer(loginForm.login, loginForm.password)
      .then((resp) => {
        const user: string = resp.body.customer.id;
        signin(user, () => navigate('/', { replace: true }));
        localStorage.setItem('userWin4ik', user);
        localStorage.removeItem('anonimTokenWin4ik');
        localStorage.removeItem('tokenWin4ik');
        getMeCustomer(loginForm.login, loginForm.password);
      })
      .catch(() => {
        setSubmitError(true);
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
      {submitError && (
        <span
          className="login-form__error"
          style={{ margin: '0 auto', paddingTop: '1rem' }}
        >
          Login or password is incorrect
        </span>
      )}
      <p className="login-form__text">
        Don❜t have an account?
        <Link className="login-form__link" to="/registration">
          Sign Up
        </Link>
      </p>
    </form>
  );
};
