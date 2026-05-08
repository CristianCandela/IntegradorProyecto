import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inicio from "./pages/public/Inicio";
import Nosotros from "./pages/public/Nosotros";
import Login from "./pages/public/Login";
import Registro from "./pages/public/Registro";


function LayoutWrapper({ children }) {
  const location = useLocation();
  const hideLayout = location.pathname === "/login" || location.pathname === "/registro";

  return (
    <div className="d-flex flex-column min-vh-100">
      {!hideLayout && <Navbar />}
      <div className="flex-grow-1">
        {children}
      </div>
      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;