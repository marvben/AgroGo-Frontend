import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext/AuthProvider.jsx';
import { ProductProvider } from './context/ProductContext/ProductProvider.jsx';
import { UIProvider } from './context/UIContext/UIProvider.jsx';
import './index.css'; // Assuming you have some global styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UIProvider>
        <AuthProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </AuthProvider>
      </UIProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
