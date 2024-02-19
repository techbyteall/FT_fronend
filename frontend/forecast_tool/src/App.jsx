import { Header } from "./components/Header"

import { Home } from "./pages/Home"
import { Models } from "./pages/Models"
import { Inputs } from "./pages/Inputs"
import { Events } from "./pages/Events"

import { BrowserRouter, Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <div>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/inputs" element = { <Inputs />} />
            </Routes>
        </BrowserRouter>
    </div>
    
  )
}

export default App