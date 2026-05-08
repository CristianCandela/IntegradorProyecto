import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoOscuro from "../images/logo.png";
import logoClaro from "../images/Logo1.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClass = scrolled 
    ? "bg-white shadow-sm py-2" 
    : "bg-transparent py-4";
  
  const linkClass = scrolled ? "text-dark" : "text-white";

  return (
    <nav className={`navbar navbar-expand-lg fixed-top transition-all ${navClass}`}>
    
      <div className="container-fluid px-5 d-flex align-items-center"> 
        
        {/* LADO IZQUIERDO: LOGO */}
        <a className="navbar-brand me-auto" href="#">
          <img src={scrolled ? logoOscuro : logoClaro} alt="logo" height="60" className="transition-all" /> 
        </a>

        {/* BOTÓN MÓVIL */}
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* LADO DERECHO: LINKS */}
        <div className="collapse navbar-collapse flex-grow-0" id="navbarNav">
          {/* El contenedor principal ya tiene d-flex, así que aquí solo manejamos la lista */}
          <ul className="navbar-nav gap-4 align-items-center">
            <li className="nav-item">
              <Link className={`nav-link fw-bold text-uppercase fs-7 ${linkClass}`} to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link fw-bold text-uppercase fs-7 ${linkClass}`} to="/nosotros">Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link fw-bold text-uppercase fs-7 ${linkClass}`} to="/login">Iniciar Sesión</Link>
            </li>
            <li className="nav-item ms-lg-2">
              <Link className="btn btn-primary px-4 py-2 rounded-pill border-0 fw-bold" 
                 style={{ background: "var(--gradient-primary)" }} to="/registro">
                Registrarse
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}