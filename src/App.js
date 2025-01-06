import './App.css';
import Router from './shared/Router';
import React from 'react';
// import MyInput from './pages/MyInput';
// import { BrowserRouter } from "react-router-dom";
// import ListPage from './components/ListPage'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <React.StrictMode>
        <Router />
        </React.StrictMode>
        {/* <MyInput/> */}
        
      </header>
    </div>
  );
}

export default App;
