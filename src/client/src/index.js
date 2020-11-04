import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './components/App';
import GlobalStyle from './components/GlobalStyle';
import Theme from './components/Theme';

ReactDOM.render(
  <ThemeProvider theme={Theme}>
    <BrowserRouter>
      <App />
      <GlobalStyle />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root'),
);
