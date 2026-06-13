import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { StorageService } from "./core/database/StorageService";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Layout from "./components/Layout";

import Inicio from "./pages/public/Inicio";
import Nosotros from "./pages/public/Nosotros";
import Login from "./pages/public/Login";
import Registro from "./pages/public/Registro";

import InicioAdmin from "./pages/admin/InicioAdmin";
import UsuariosAdmin from "./pages/admin/UsuariosAdmin";
import ReportesAdmin from "./pages/admin/ReportesAdmin";

import InicioEstudiante from "./pages/estudiante/InicioEstudiante";
import BuscarEstudiante from "./pages/estudiante/BuscarEstudiante";
import ReseñasEstudiante from "./pages/estudiante/ReseñasEstudiante";
import TutoriasEstudiante from "./pages/estudiante/TutoriasEstudiante";

import InicioProfesor from "./pages/profesor/InicioProfesor";
import EvaluacionesProfesor from "./pages/profesor/EvaluacionesProfesor";
import TutoriasProfesor from "./pages/profesor/TutoriasProfesor";

function LayoutWrapper({ children }) {
  const location = useLocation();

  // Rutas Admin
  const adminRoutes = [
    "/inicio-admin",
    "/usuarios-admin",
    "/reportes-admin",
  ];

  // Rutas Profesor
  const profesorRoutes = [
    "/inicio-profesor",
    "/evaluaciones-profesor",
    "/tutorias-profesor",
  ];

  // Rutas Estudiante
  const estudianteRoutes = [
    "/inicio-estudiante",
    "/buscar-estudiante",
    "/resenas-estudiante",
    "/tutorias-estudiante",
  ];

  // Rutas Auth
  const authRoutes = [
    "/login",
    "/registro",
  ];

  const isAdmin = adminRoutes.includes(location.pathname);
  const isProfesor = profesorRoutes.includes(location.pathname);
  const isEstudiante = estudianteRoutes.includes(location.pathname);

  useEffect(() => {
    if (isEstudiante) {
      StorageService.initialize();
    }
  }, [isEstudiante]);

  const isDashboard =
    isAdmin || isProfesor || isEstudiante;

  const isAuthPage =
    authRoutes.includes(location.pathname);

  let role = null;

  if (isAdmin) role = "admin";
  if (isProfesor) role = "profesor";
  if (isEstudiante) role = "estudiante";

  // DASHBOARD PRIVADO
  if (isDashboard) {
    return (
      <Layout role={role}>
        {children}
      </Layout>
    );
  }

  // LOGIN / REGISTRO
  if (isAuthPage) {
    return children;
  }

  // PÁGINAS PÚBLICAS
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="flex-grow-1">
        {children}
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>

          {/* Públicas */}
          <Route path="/" element={<Inicio />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* Admin */}
          <Route path="/inicio-admin" element={<InicioAdmin />} />
          <Route path="/usuarios-admin" element={<UsuariosAdmin />} />
          <Route path="/reportes-admin" element={<ReportesAdmin />} />

          {/* Estudiante */}
          <Route path="/inicio-estudiante" element={<InicioEstudiante />} />
          <Route path="/buscar-estudiante" element={<BuscarEstudiante />} />
          <Route path="/resenas-estudiante" element={<ReseñasEstudiante />} />
          <Route path="/tutorias-estudiante" element={<TutoriasEstudiante />} />

          {/* Profesor */}
          <Route path="/inicio-profesor" element={<InicioProfesor />} />
          <Route path="/evaluaciones-profesor" element={<EvaluacionesProfesor />} />
          <Route path="/tutorias-profesor" element={<TutoriasProfesor />} />

        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;