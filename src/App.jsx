import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Hidrometro from "./pages/Hidrometro";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/hidrometro" element={<Hidrometro />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;