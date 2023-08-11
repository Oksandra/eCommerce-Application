import React from 'react';
import './App.scss';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';

/* interface MyForm {
  firstName: string;
  lastName: string;
} */

function App(): JSX.Element {
  return (
    <div className="registration-page">
      <RegistrationForm />
    </div>
  );
}

export default App;
