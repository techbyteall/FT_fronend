import { Header } from "./components/Header";
import React, { useState } from 'react';
import { Home } from "./pages/Home";
import { Inputs } from "./pages/Inputs";
// import EventSetCreate from "./pages/inputs/events/EventSetCreate";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export const App = () => {

  // const [showEventSetCreate, setShowEventSetCreate] = useState(false);


  return (
    <div>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/inputs" element = { <Inputs />} />
                {/* <Route path="/inputs/create-event-set" element={<EventSetCreate />} />  setShowEventSetCreate={setShowEventSetCreate}*/}
            </Routes>
            </BrowserRouter>
    </div>
    
  )
}

export default App;