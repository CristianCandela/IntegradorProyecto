import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2"; 

export default function Sidebar({ role }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  
  // SIMULACIÓN DE NOTIFICACIONES
  const [notificaciones, setNotificaciones] = useState([
    { id: 1, mensaje: "Tu tutoría con Luis Carlos ha sido confirmada.", leida: false },
    { id: 2, mensaje: "Alerta: El estudiante Carlos Mendoza canceló la tutoría de hoy.", leida: false }
  ]);

  // SCORE DE CONFIABILIDAD
  const [scoreConfiabilidad, setScoreConfiabilidad] = useState(() => {
    return Number(localStorage.getItem("score_profesor")) || 100;
  });

  useEffect(() => {
    const revisarScore = () => {
      setScoreConfiabilidad(Number(localStorage.getItem("score_profesor")) || 100);
    };
    window.addEventListener("storage", revisarScore);
    return () => window.removeEventListener("storage", revisarScore);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const menuConfig = {
    admin: {
      // DEGRADADO CORPORATIVO: Índigo base a Índigo Oscuro (#1F0954)
      color: "linear-gradient(180deg, #3F51B5 0%, #1F0954 100%)", 
      items: [
        { name: "Dashboard", icon: "bi-speedometer2", path: "/inicio-admin" },
        { name: "Usuarios", icon: "bi-people", path: "/usuarios-admin" },
        { name: "Reportes", icon: "bi-bar-chart", path: "/reportes-admin" },
      ]
    },
    profesor: {
      // Degradado Profesor: Índigo a Morado
      color: "linear-gradient(180deg, #3F51B5 0%, #7B1FA2 100%)",
      items: [
        { name: "Mi Perfil", icon: "bi-person-badge", path: "/inicio-profesor" },
        { name: "Evaluaciones", icon: "bi-star", path: "/evaluaciones-profesor" },
        { name: "Tutorias", icon: "bi-book", path: "/tutorias-profesor" },
      ]
    },
    estudiante: {
      color: "#493774",
      items: [
        { name: "Inicio", icon: "bi-house-door", path: "/inicio-estudiante" },
        { name: "Buscar Profe", icon: "bi-search", path: "/buscar-estudiante" },
        { name: "Mis Reseñas", icon: "bi-chat-left-text", path: "/resenas-estudiante" },
        { name: "Buscar Tutorias", icon: "bi-mortarboard", path: "/tutorias-estudiante" },
      ]
    }
  };

  const config = menuConfig[role] || menuConfig["estudiante"];

  const obtenerColorScore = (score) => {
    if (score >= 90) return "#28a745"; // Verde
    if (score >= 70) return "#ffc107"; // Amarillo
    if (score >= 50) return "#fd7e14"; // Naranja
    return "#dc3545"; // Rojo
  };

  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar Sesión?",
      text: "Tendrás que volver a ingresar para acceder a tu panel.",
      icon: "question",
      showCancelButton: true,
      // Usar el índigo oscuro como color principal en las alertas del admin
      confirmButtonColor: role === 'admin' ? '#1F0954' : config.color,
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userSession"); 
        navigate("/login");
      }
    });
  };

  const marcarComoLeida = (id) => {
    setNotificaciones(notificaciones.map(n => n.id === id ? { ...n, leida: true } : n));
  };

  const alertasNoLeidas = notificaciones.filter(n => !n.leida).length;

  return (
    <div 
      className={`sidebar-container ${isExpanded ? "expanded" : "collapsed"}`}
      style={{ background: config.color, minHeight: '100vh', transition: 'width 0.3s ease' }} 
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => {
        setIsExpanded(false);
        setMostrarNotificaciones(false);
      }}
    >
      {/* HEADER DE MARCA */}
      <div className="sidebar-header d-flex align-items-center justify-content-between px-3 w-100 py-3">
        <div className="d-flex align-items-center">
          <img src="/minilogo.png" alt="Logo" className="logo-img" style={{ width: '30px' }} />
          {isExpanded && <span className="logo-text ms-2 fw-bold text-white">ProfeMatch</span>}
        </div>
      </div>

      {/* SISTEMA DE NOTIFICACIONES */}
      <div className="px-3 py-2 position-relative w-100">
        <button 
          className="btn btn-link text-white p-0 d-flex align-items-center gap-2 style-none text-decoration-none"
          onClick={() => setMostrarNotificaciones(!mostrarNotificaciones)}
          style={{ border: 'none', background: 'none' }}
        >
          <div className="position-relative">
            <i className="bi bi-bell-fill fs-5"></i>
            {alertasNoLeidas > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger" style={{ fontSize: '0.6rem', padding: '0.25rem 0.4rem' }}>
                {alertasNoLeidas}
              </span>
            )}
          </div>
          {isExpanded && <span className="small text-white">Notificaciones</span>}
        </button>

        {mostrarNotificaciones && (
          <div className="position-absolute bg-white rounded shadow p-2 mt-2" style={{ width: '240px', zIndex: 1100, left: '15px', border: '1px solid #ddd' }}>
            <h6 className="fw-bold text-dark px-2 pt-1 border-bottom pb-1 mb-1" style={{ fontSize: '0.8rem' }}>Alertas Recientes</h6>
            {notificaciones.length > 0 ? (
              notificaciones.map(n => (
                <div 
                  key={n.id} 
                  className={`p-2 small mb-1 rounded cursor-pointer ${n.leida ? 'text-muted bg-light' : 'text-dark fw-medium bg-info-subtle'}`}
                  style={{ fontSize: '0.75rem', cursor: 'pointer', borderLeft: n.leida ? 'none' : '3px solid #0dcaf0' }}
                  onClick={() => marcarComoLeida(n.id)}
                >
                  {n.mensaje}
                </div>
              ))
            ) : (
              <div className="text-muted p-2 text-center small" style={{ fontSize: '0.75rem' }}>No tienes alertas.</div>
            )}
          </div>
        )}
      </div>

      <hr className="my-2 text-white opacity-25 w-100" />

      {/* MENÚ DE NAVEGACIÓN */}
      <nav className="sidebar-nav w-100">
        {config.items.map((item) => (
          <Link 
            key={item.name} 
            to={item.path} 
            className={`nav-item d-flex align-items-center px-3 py-2 my-1 text-white text-decoration-none ${location.pathname === item.path ? "active bg-white bg-opacity-25 rounded" : ""}`}
            style={{ transition: 'background-color 0.2s' }}
          >
            <i className={`bi ${item.icon} fs-5 me-3`}></i>
            {isExpanded && <span className="nav-text small">{item.name}</span>}
          </Link>
        ))}
      </nav>

      {/* WIDGET DEL SCORE DE CONFIABILIDAD */}
      <div className="w-100 px-3 mt-auto mb-2">
        <div className="p-2 rounded bg-white bg-opacity-10 text-white" style={{ fontSize: '0.8rem' }}>
          <div className="d-flex justify-content-between align-items-center mb-1">
            <i className="bi bi-shield-check fs-6"></i>
            {isExpanded && <span className="fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>CONFIABILIDAD</span>}
            <span className="badge" style={{ backgroundColor: obtenerColorScore(scoreConfiabilidad) }}>
              {scoreConfiabilidad}%
            </span>
          </div>
          {isExpanded && (
            <div className="progress mt-2" style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.2)' }}>
              <div 
                className="progress-bar" 
                style={{ 
                  width: `${scoreConfiabilidad}%`, 
                  backgroundColor: obtenerColorScore(scoreConfiabilidad) 
                }}
              ></div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER - CERRAR SESIÓN */}
      <div className="sidebar-footer w-100 mt-2">
        <button onClick={handleLogout} className="nav-item logout-btn btn btn-link text-white text-decoration-none d-flex align-items-center px-3 py-2 w-100 style-none" style={{ border: 'none', background: 'none' }}>
          <i className="bi bi-box-arrow-left fs-5 me-3"></i>
          {isExpanded && <span className="nav-text small">Cerrar Sesión</span>}
        </button>
      </div>
    </div>
  );
}