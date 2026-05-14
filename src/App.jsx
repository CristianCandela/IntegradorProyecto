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

import UsuariosAdmin from "./pages/admin/UsuariosAdmin";
import ReportesAdmin from "./pages/admin/ReportesAdmin";

import BuscarEstudiante from "./pages/estudiante/BuscarEstudiante";
import ReseñasEstudiante from "./pages/estudiante/ReseñasEstudiante";
import TutoriasEstudiante from "./pages/estudiante/TutoriasEstudiante";
import EvaluacionesProfesor from "./pages/profesor/EvaluacionesProfesor";
import TutoriasProfesor from "./pages/profesor/TutoriasProfesor";

function LayoutWrapper({ children }) {

  const location = useLocation();

  const hideLayout = [
  "/login",
  /*"/registro",*/
  "/inicio-admin",
  "/usuarios-admin",
  "/reportes-admin",

  "/inicio-estudiante",
  "/buscar-estudiante",
  "/resenas-estudiante",
  "/tutorias-estudiante",

  "/inicio-profesor",
  "/evaluaciones-profesor",
  "/tutorias-profesor"
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

          {/* Rutas Privadas */}
          <Route path="/inicio-admin" element={<InicioAdmin />} />
          <Route path="/usuarios-admin" element={<UsuariosAdmin />} />
          <Route path="/reportes-admin" element={<ReportesAdmin />} />

          <Route path="/inicio-estudiante" element={<InicioEstudiante />} />
          <Route path="/buscar-estudiante" element={<BuscarEstudiante />} />
          <Route path="/resenas-estudiante" element={<ReseñasEstudiante />} />
          <Route path="/tutorias-estudiante" element={<TutoriasEstudiante/>} />

          <Route path="/inicio-profesor" element={<InicioProfesor />} />
          <Route path="/tutorias-profesor" element={<TutoriasProfesor />} />
          <Route path="/evaluaciones-profesor" element={<EvaluacionesProfesor />} />

        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;

