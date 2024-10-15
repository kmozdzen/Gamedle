import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';  // Dodaj ten import

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <Router>
                <App />
            </Router>
        </React.StrictMode>
    );
} else {
    console.error('Root element not found');
}
