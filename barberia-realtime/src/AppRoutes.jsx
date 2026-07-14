import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import MissionControl from "./pages/MissionControl.jsx";
import Transformations from "./pages/Transformations.jsx";
import Ecosystem from "./pages/Ecosystem.jsx";
import EnterprisePlatform from "./pages/EnterprisePlatform.jsx";
import StartProject from "./pages/StartProject.jsx";
import BookingApp from "./App.jsx"; // original booking flow

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MissionControl />} />
        <Route path="/transformaciones" element={<Transformations />} />
        <Route path="/ecosistema" element={<Ecosystem />} />
        <Route path="/plataforma" element={<EnterprisePlatform />} />
        <Route path="/iniciar" element={<StartProject />} />
        <Route path="/reserva" element={<BookingApp />} />
      </Route>
    </Routes>
  );
}
