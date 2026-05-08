import "./Login.css";
import { useState, useEffect } from "react"; // Añadimos useEffect
import { Link, useNavigate } from "react-router-dom"; 
import LoginHero from "../../components/LoginHero";
import heroVideo from "../../images/hero.mp4";
import WhatsappBtn from "../../components/WhatsappBtn";
import Swal from "sweetalert2"; 

const roleData = {
  admin: { email: "admin@profematch.com", pass: "admin123", path: "/inicio-admin", color: "#180f2a" },
  profesor: { email: "prof@profematch.com", pass: "prof123", path: "/inicio-profesor", color: "#1f1c64" },
  estudiante: { email: "estu@profematch.com", pass: "estu123", path: "/inicio-estudiante", color: "#493774" },
};

export default function Login() {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const sessionActiva = localStorage.getItem("userSession");
    if (sessionActiva) {
      const { role: savedRole } = JSON.parse(sessionActiva);
      navigate(roleData[savedRole].path);
    }
  }, [navigate]);

  const handleRoleChange = (newRole) => {
    if (newRole !== role) {
      setIsAnimating(true);
      setRole(newRole);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = roleData[role];

    if (email === user.email && password === user.pass) {
      
      localStorage.setItem("userSession", JSON.stringify({ role: role, email: email }));

      Swal.fire({
        title: "¡Bienvenido!",
        text: `Entrando como ${role}`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
        background: user.color,
        color: "#fff",
        iconColor: "#fff"
      }).then(() => navigate(user.path));
    } else {
      Swal.fire({ title: "Error", text: "Credenciales incorrectas", icon: "error", confirmButtonColor: user.color });
    }
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

              <div className="d-grid gap-3">
                <button type="submit" className={`btn btn-auth py-3 shadow btn-${role}-grad`}>Iniciar Sesión</button>
                <div className="row g-2">
                  {['admin', 'profesor', 'estudiante'].filter(r => r !== role).map(r => (
                    <div className="col" key={r}>
                      <button type="button" onClick={() => handleRoleChange(r)} className="btn w-100 py-2 small hover-effect text-capitalize border">Soy {r}</button>
                    </div>
                  ))}
                </div>
              </div>
            </form>

            <div className="demo-section p-3 rounded-4">
              <div className="text-center mb-2"><span className="demo-label">CREDENCIALES DEMO</span></div>
              <div className="d-flex justify-content-center gap-2">
                {Object.keys(roleData).map(r => (
                  <button key={r} type="button" onClick={() => { setEmail(roleData[r].email); setPassword(roleData[r].pass); }} className="btn-tag text-capitalize">{r.slice(0, 5)}</button>
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