import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import '@fontsource/lato/900.css';
import '@fontsource/khand/700.css';
import '@fontsource/league-script/400.css';
import '@fontsource/league-gothic/400.css';
import '@fontsource/m-plus-2/300.css';
import './index.css';
import App from './App';
import './responsive.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
