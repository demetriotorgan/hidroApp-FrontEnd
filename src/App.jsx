import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Hidrometro from "./pages/Hidrometro";
import Pluviometro from "./pages/Pluviometro";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/hidrometro" element={<Hidrometro />} />
        <Route path="/pluviometro" element={<Pluviometro />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;