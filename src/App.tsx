import React from 'react';
import apiRoot from './sdk/client';
import './App.scss';

function App(): JSX.Element {
  return <div className="App"> </div>;
}

async function getProjectDetails(): Promise<void> {
  apiRoot
    .customers()
    .post({
      body: {
        email: 'nastya@example.com',
        password: 'nastyaPassword',
        firstName: 'Nastya',
        lastName: 'Alisenok',
        dateOfBirth: '1989-02-14',
        addresses: [],
      },
    })
    .execute()
    .then(({ body }) => {
      const app = window.document.querySelector('.app');
      if (app instanceof HTMLElement) {
        app.innerHTML = JSON.stringify(body);
      }
    });
}

window.addEventListener('DOMContentLoaded', getProjectDetails);

export default App;
