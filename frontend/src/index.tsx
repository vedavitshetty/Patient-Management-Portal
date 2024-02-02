import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import 'tailwindcss/tailwind.css';

ReactDOM.render(
  <Provider store={store}> {/* Wrap your App with Provider */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
