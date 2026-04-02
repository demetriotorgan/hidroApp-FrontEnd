import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Hidrometro from "./pages/Hidrometro";
import Pluviometro from "./pages/Pluviometro";
import Tambor from "./pages/Tambor";
import Modelo from "./pages/Modelo";
import Previsao from "./pages/Previsao";
import Lavagem from "./pages/Lavagem";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/hidrometro" element={<Hidrometro />} />
        <Route path="/pluviometro" element={<Pluviometro />} />
        <Route path="/tambor" element={<Tambor/>}/>
        <Route path="/modelo" element={<Modelo />}/>
        <Route path="/previsao" element={<Previsao/>}/>   
        <Route path="/lavagem" element={<Lavagem/>}/>   
      </Routes>

    </BrowserRouter>
  );
}

export default App;