import React from "react";
import { Route, Routes } from "react-router-dom";

import Start from "./components/Start/Start";
import Game from "./components/Game/Game";


function App() {
  return (
    <div>
        <Routes>
            <Route 
                path="/" 
                element={<Start/>}>
            </Route>
            <Route 
                path="/game" 
                element={<Game/>}>
            </Route>
        </Routes>
    </div>
  );
}

export default App;
