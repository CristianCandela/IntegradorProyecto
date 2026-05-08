import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inicio from "./pages/public/Inicio";
import Nosotros from "./pages/public/Nosotros";
import Login from "./pages/public/Login";
import Registro from "./pages/public/Registro";

import InicioAdmin from "./pages/admin/InicioAdmin";
import InicioEstudiante from "./pages/estudiante/InicioEstudiante";
import InicioProfesor from "./pages/profesor/InicioProfesor";

function LayoutWrapper({ children }) {

  const location = useLocation();

  const hideLayout = [
  "/login",
  "/registro",
  "/inicio-admin",
  "/inicio-estudiante",
  "/inicio-profesor"
  ].includes(location.pathname);

  return (
  <div className="d-flex flex-column min-vh-100">
    {!hideLayout && <Navbar />}
      <div className="flex-grow-1"> {children} </div>
    {!hideLayout && <Footer />}
  </div>
  );
}

function App() {

  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Inicio />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* Rutas Privadas (Nuevas) */}
          <Route path="/inicio-admin" element={<InicioAdmin />} />
          <Route path="/inicio-estudiante" element={<InicioEstudiante />} />
          <Route path="/inicio-profesor" element={<InicioProfesor />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;

