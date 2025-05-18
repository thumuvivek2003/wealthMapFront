import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import App from './App.tsx';
import client from './apolloClient';
import './index.css';
import 'leaflet/dist/leaflet.css';

const container = document.getElementById('root');

if (!container) throw new Error('Root container missing in index.html');

createRoot(container).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
