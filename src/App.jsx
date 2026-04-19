import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Hidrometro from "./pages/Hidrometro";
import Pluviometro from "./pages/Pluviometro";
import Iqa from "./pages/Iqa";
import Modelo from "./pages/Modelo";
import Previsao from "./pages/Previsao";
import Lavagem from "./pages/Lavagem";
import Cloro from './pages/Cloro';

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/hidrometro" element={<Hidrometro />} />
        <Route path="/pluviometro" element={<Pluviometro />} />
        <Route path="/iqa" element={<Iqa/>}/>
        <Route path="/modelo" element={<Modelo />}/>
        <Route path="/previsao" element={<Previsao/>}/>   
        <Route path="/lavagem" element={<Lavagem/>}/>   
        <Route path="/cloro" element={<Cloro/>}/> 
      </Routes>

    </BrowserRouter>
  );
}

export default App;