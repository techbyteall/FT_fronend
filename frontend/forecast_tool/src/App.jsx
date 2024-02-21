import { Header } from "./components/Header"

import { Home } from "./pages/Home"
import { Inputs } from "./pages/Inputs"

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