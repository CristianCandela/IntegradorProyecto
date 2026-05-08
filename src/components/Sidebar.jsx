import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";


export default function Sidebar({ role }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuConfig = {
    admin: {
      color: "#180f2a",
      items: [
        { name: "Dashboard", icon: "bi-speedometer2", path: "/inicio-admin" },
        { name: "Usuarios", icon: "bi-people", path: "/admin-users" },
        { name: "Reportes", icon: "bi-bar-chart", path: "/admin-reports" },
      ]
    },
    profesor: {
      color: "#1f1c64",
      items: [
        { name: "Mi Perfil", icon: "bi-person-badge", path: "/inicio-profesor" },
        { name: "Evaluaciones", icon: "bi-star", path: "/profesor-evals" },
        { name: "Mis Cursos", icon: "bi-book", path: "/profesor-cursos" },
      ]
    },
    estudiante: {
      color: "#493774",
      items: [
        { name: "Inicio", icon: "bi-house-door", path: "/inicio-estudiante" },
        { name: "Buscar Profe", icon: "bi-search", path: "/buscar" },
        { name: "Mis Reseñas", icon: "bi-chat-left-text", path: "/mis-resenas" },
      ]
    }
  };

  const config = menuConfig[role];

  return (
    <div 
      className={`sidebar-container ${isExpanded ? "expanded" : "collapsed"}`}
      style={{ backgroundColor: config.color }} // Fondo característico
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="sidebar-header">
        <img src="/minilogo.png" alt="Logo" className="logo-img" />
        {isExpanded && <span className="logo-text ms-2">ProfeMatch</span>}
      </div>

      <nav className="sidebar-nav">
        {config.items.map((item) => (
          <Link 
            key={item.name} 
            to={item.path} 
            className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
          >
            <i className={`bi ${item.icon}`}></i>
            {isExpanded && <span className="nav-text">{item.name}</span>}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button onClick={() => navigate("/login")} className="nav-item logout-btn">
          <i className="bi bi-box-arrow-left"></i>
          {isExpanded && <span className="nav-text">Cerrar Sesión</span>}
        </button>
      </div>
    </div>
  );
}