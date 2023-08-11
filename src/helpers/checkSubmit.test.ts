import { checkSubmit, ILoginForm } from './checkSubmit';

describe('checkSubmit function', () => {
  test('returns true if login or password are empty', () => {
    const loginError = '';
    const passwordError = '';
    const formData: ILoginForm = {
      login: '',
      password: 'securePassword123',
    };
    const setLoginError = jest.fn();
    const setPasswordError = jest.fn();

    const result = checkSubmit(
      loginError,
      passwordError,
      formData,
      setLoginError,
      setPasswordError
    );

    expect(result).toBe(true);
    expect(setLoginError).toHaveBeenCalledWith('Please enter email.');
    expect(setPasswordError).not.toHaveBeenCalled();
  });

  test('returns true if loginError or passwordError are not empty', () => {
    const loginError = 'Invalid email';
    const passwordError = '';
    const formData: ILoginForm = {
      login: 'test@example.com',
      password: 'securePassword123',
    };
    const setLoginError = jest.fn();
    const setPasswordError = jest.fn();

    const result = checkSubmit(
      loginError,
      passwordError,
      formData,
      setLoginError,
      setPasswordError
    );

    expect(result).toBe(true);
    expect(setLoginError).not.toHaveBeenCalled();
    expect(setPasswordError).not.toHaveBeenCalled();
  });

  test('returns false if login and password are not empty and errors are empty', () => {
    const loginError = '';
    const passwordError = '';
    const formData: ILoginForm = {
      login: 'test@example.com',
      password: 'securePassword123',
    };
    const setLoginError = jest.fn();
    const setPasswordError = jest.fn();

    const result = checkSubmit(
      loginError,
      passwordError,
      formData,
      setLoginError,
      setPasswordError
    );

    expect(result).toBe(false);
    expect(setLoginError).not.toHaveBeenCalled();
    expect(setPasswordError).not.toHaveBeenCalled();
  });
});
