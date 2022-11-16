import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes, Link, NavLink, useLocation} from 'react-router-dom'
import { LoginContext } from "./functions/context/LoginContext";
//import { AuthContextProvider } from './functions/context/AuthContext'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      
        <Routes>
            <Route path = "/*" element = {<App /> } />
          </Routes> 
      
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
