import "./Login.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import LoginHero from "../../components/LoginHero";
import heroVideo from "../../images/hero.mp4";
import WhatsappBtn from "../../components/WhatsappBtn";
import Swal from "sweetalert2"; 
import { StorageService } from "../../core/database/StorageService";

// Role styling data
const roleData = {
  admin: { path: "/inicio-admin", color: "#180f2a" },
  profesor: { path: "/inicio-profesor", color: "#1f1c64" },
  estudiante: { path: "/inicio-estudiante", color: "#493774" },
};

const demoCredentials = {
  admin: { email: "admin@profematch.com", pass: "admin123" },
  profesor: { email: "prof@profematch.com", pass: "prof123" },
  estudiante: { email: "estu@profematch.com", pass: "estu123" },
};

export default function Login() {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // Solo para UI styling
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const sessionActiva = localStorage.getItem("userSession");
    
    if (sessionActiva) {
      try {
        const sessionData = JSON.parse(sessionActiva);
        const token = sessionData.token;

        // Validar expiración del JWT
        if (token) {
          const payload = JSON.parse(atob(token.split(".")[1]));
          const expirado = payload.exp * 1000 < Date.now();

          if (expirado) {
            localStorage.removeItem("userSession");
            return;
          }
        }
        
        if (roleData[sessionData.role]) {
          navigate(roleData[sessionData.role].path);
        }
      } catch (e) {
        // En caso de que el token esté corrupto o haya un error, limpiar sesión
        localStorage.removeItem("userSession");
      }
    }
  }, [navigate]);

  const handleRoleChange = (newRole) => {
    if (newRole !== role) {
      setIsAnimating(true);
      setRole(newRole);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        const user = data.user || data; 
        const userRole = user.role || user.rol;
        
        const sessionData = {
          token: data.token,
          id: user.id,
          role: userRole, 
          email: user.email, 
          nombres: user.nombres || user.nombre 
        };

        if (userRole === 'profesor') {
          sessionData.universidad = user.universidad;
          sessionData.perfil_completado = user.perfil_completado;
          sessionData.cursos = user.cursos;
        }

        // Guardar sesión incluyendo el token y los datos de perfil
        localStorage.setItem("userSession", JSON.stringify(sessionData));

        Swal.fire({
          title: "¡Bienvenido!",
          text: `Entrando como ${userRole}`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
          background: roleData[userRole]?.color || roleData['estudiante'].color,
          color: "#fff",
          iconColor: "#fff"
        }).then(() => navigate(roleData[userRole]?.path || "/"));

      } else {
        if (data.message === "pending_approval" || data.error === "pending_approval") {
          Swal.fire({ 
            title: "Cuenta en revisión", 
            text: "Tu cuenta ha sido creada, pero aún está pendiente de aprobación por un administrador.", 
            icon: "info", 
            confirmButtonColor: roleData[role].color 
          });
        } else {
          Swal.fire({ 
            title: "Error", 
            text: data.message || data.error || "Credenciales incorrectas", 
            icon: "error", 
            confirmButtonColor: roleData[role].color 
          });
        }
      }
    } catch (error) {
      console.error("Error en login:", error);
      Swal.fire({ 
        title: "Error de conexión", 
        text: "No se pudo conectar con el servidor Backend. Asegúrate de que el servidor esté corriendo.", 
        icon: "error", 
        confirmButtonColor: roleData[role].color 
      });
    }
  };

  const handleSocialLogin = (provider) => {
    Swal.fire({
      title: `Iniciar sesión con ${provider}`,
      text: "Funcionalidad de proveedor social pendiente de conexión con el backend.",
      icon: "info",
      confirmButtonColor: roleData[role].color,
    });
  };

  return (
    <main className="container-fluid p-0 vh-100 overflow-hidden">
  
      <div className="row g-0 h-100">
        <div className="col-lg-6 d-none d-lg-block p-0">
          <LoginHero video={heroVideo} titulo="Bienvenido a" highlight="ProfeMatch" subtitulo="La plataforma perfecta para evaluar profesores." />
        </div>

        <div className="col-lg-6 d-flex align-items-center justify-content-center position-relative px-4">
          <div className="position-absolute top-0 end-0 p-4">
            <span className="text-muted small">¿Eres nuevo?</span>
            <Link to="/registro" className="ms-2 fw-bold text-decoration-none small hover-link">Crea una cuenta</Link>
          </div>

          <div className={`login-card p-5 shadow-lg rounded-5 bg-white w-100 ${isAnimating ? 'role-swap' : ''}`} style={{ maxWidth: "460px" }}>
            <div className="text-center mb-4">
              <div className="icon-badge-top mb-3 shadow-sm" style={{ backgroundColor: roleData[role].color }}>
                <i className="bi bi-shield-lock-fill text-white"></i>
              </div>
              <h2 className="fw-bold text-dark">¡Hola de nuevo!</h2>
              <p className="text-muted small">Ingresando como <strong className="text-indigo text-capitalize">{role}</strong></p>
            </div>

            <form className="mb-4" onSubmit={handleLogin}>
              <div className="input-group mb-3">
                <span className="input-group-text bg-light border-0 rounded-start-4"><i className="bi bi-envelope text-muted"></i></span>
                <input type="email" className="form-control bg-light border-0 py-3 rounded-end-4" placeholder={role === 'admin' ? "Correo Admin" : "Correo Institucional"} value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="input-group mb-4">
                <span className="input-group-text bg-light border-0 rounded-start-4"><i className="bi bi-lock text-muted"></i></span>
                <input type="password" className="form-control bg-light border-0 py-3 rounded-end-4" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>

              <div className="d-grid gap-3 mb-4">
                <button type="submit" className={`btn btn-auth py-3 shadow btn-${role}-grad`}>Iniciar Sesión</button>
                <div className="row g-2">
                  {['admin', 'profesor', 'estudiante'].filter(r => r !== role).map(r => (
                    <div className="col" key={r}>
                      <button type="button" onClick={() => handleRoleChange(r)} className="btn w-100 py-2 small hover-effect text-capitalize border">Soy {r}</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center position-relative my-4">
                <hr className="text-muted opacity-25" />
                <span className="position-absolute top-50 start-50 translate-middle px-3 bg-white text-muted small">
                  O ingresa con
                </span>
              </div>

              <div className="row g-2 mb-4">
                <div className="col-6">
                  <button type="button" onClick={() => handleSocialLogin('Google')} className="btn btn-outline-secondary w-100 py-2 d-flex align-items-center justify-content-center gap-2">
                    <i className="bi bi-google text-danger"></i>
                    <span className="small">Google</span>
                  </button>
                </div>
                <div className="col-6">
                  <button type="button" onClick={() => handleSocialLogin('Microsoft')} className="btn btn-outline-secondary w-100 py-2 d-flex align-items-center justify-content-center gap-2">
                    <i className="bi bi-microsoft text-primary"></i>
                    <span className="small">Microsoft</span>
                  </button>
                </div>
              </div>

            </form>

            <div className="demo-section p-3 rounded-4">
              <div className="text-center mb-2"><span className="demo-label">CREDENCIALES DEMO</span></div>
              <div className="d-flex justify-content-center gap-2">
                {Object.keys(demoCredentials).map(r => (
                  <button key={r} type="button" onClick={() => { setEmail(demoCredentials[r].email); setPassword(demoCredentials[r].pass); }} className="btn-tag text-capitalize">{r.slice(0, 5)}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <WhatsappBtn /> 
    </main>
  );
}