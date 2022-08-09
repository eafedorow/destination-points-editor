import React from 'react';
import './styles/index.scss'
import {Route, Routes} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage/LoginPage";
import {MapPage} from "./pages/MapPage/MapPage";

function App() {
  return (
    <div className="global-container">
      <div className="container">
          <Routes>
              <Route path="/" element={<LoginPage/>}/>
              <Route path="/map" element={<MapPage/>}/>
          </Routes>
      </div>
    </div>
  );
}

export default App;
