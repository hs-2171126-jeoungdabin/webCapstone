import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from "react-router-dom";;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
   <Header attr={"header__wrap"} />
         <App />
    <Footer attr={"footer__wrap"} />
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
