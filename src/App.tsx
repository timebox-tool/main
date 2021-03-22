import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import { theme } from 'theme';
import './App.css';
import { TimeBoxPage } from './page/time-box';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TimeBoxPage />
    </ThemeProvider>
  );
}

export default App;
