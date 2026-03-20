import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Hidrometro from "./pages/Hidrometro";
import Pluviometro from "./pages/Pluviometro";
import Tambor from "./pages/Tambor";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/hidrometro" element={<Hidrometro />} />
        <Route path="/pluviometro" element={<Pluviometro />} />
        <Route path="/tambor" element={<Tambor/>}/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;