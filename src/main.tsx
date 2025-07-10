import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Web3Provider } from './components/Web3Provider.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

try {
  createRoot(rootElement).render(
    <Web3Provider>
      <App />
    </Web3Provider>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  // Fallback rendering
  rootElement.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
      <h1>ZoraX</h1>
      <p>Loading application...</p>
      <p style="color: red; font-size: 12px;">If this message persists, check the console for errors.</p>
    </div>
  `;
}
