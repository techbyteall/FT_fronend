import { Header } from "./components/Header";
import React, { useState } from 'react';
import { Home } from "./pages/Home";
import { Inputs } from "./pages/Inputs";
import { Scenario } from "./pages/Scenario";
import { Servers } from "./pages/Servers";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export const App = () => {
  return (
    <div>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/inputs" element = { <Inputs />} />
                <Route path="/scenario" element = { <Scenario />} />
                <Route path="/servers" element = { <Servers />} />
            </Routes>
            </BrowserRouter>
    </div>    
  )
}

export default App;