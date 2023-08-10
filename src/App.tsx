import React from 'react';
import './App.scss';
import RegistrationForm from './components/registration-form/registration-form';

/* interface MyForm {
  firstName: string;
  lastName: string;
} */

function App(): JSX.Element {
  return (
    <div>
      <RegistrationForm />
    </div>
  );
}

export default App;
