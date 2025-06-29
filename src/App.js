import "./App.css";
import { Routes, Route } from "react-router-dom";
import Cards from "./pages/Cards";
import CardDetail from "./comps/CardDetail";

function App() {
  return (
    <Routes>
      <Route index element={<Cards />} />
      <Route path="/:id" element={<CardDetail />} />
    </Routes>
  );
}

export default App;
