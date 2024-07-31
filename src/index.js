// import React from 'react';
// import HomePage from "./components/home/HomePage";
// export default function Home() {
//     return (
//         <div className="app-container">
//            <HomePage />
//         </div>
//     );
// }

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./app";
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
