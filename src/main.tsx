import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Importamos Router aquí
import client from './apollo.ts';

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <StrictMode>
      <Router>
        <App />
      </Router>
    </StrictMode>
  </ApolloProvider>
);