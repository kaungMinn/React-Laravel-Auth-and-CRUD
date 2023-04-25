import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import App from './App'
import './assets/css/all.min.css';
import './assets/css/bootstrap.min.css';
import routes from './routes';
import ContextProvider from './contexts/ContextProvider';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
        <RouterProvider router={routes}  />
    </ContextProvider>

  </React.StrictMode>,
)
