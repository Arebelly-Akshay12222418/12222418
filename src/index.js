import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Grab the root element from the HTML
const rootElement = document.getElementById('root');

// Create a root and render the main App component
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
