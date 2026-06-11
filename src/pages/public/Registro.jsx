import "./Registro.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginHero from "../../components/LoginHero";
import heroVideo from "../../images/hero.mp4";
import WhatsappBtn from "../../components/WhatsappBtn";
import Swal from "sweetalert2";

const roleOptions = {
  estudiante: { 
    color: "#493774", 
    icon: "bi-mortarboard-fill",
    title: "Estudiante",
    desc: "Encuentra los mejores profesores",
    fields: [
      { name: "nombres", label: "Nombres completos", icon: "bi-person", type: "text", placeholder: "Ej: Juan Carlos" },
      { name: "email", label: "Correo universitario", icon: "bi-envelope", type: "email", placeholder: "tu.nombre@u.edu.pe" },
      { name: "codigo", label: "Código estudiantil", icon: "bi-hash", type: "text", placeholder: "Ej: 202101234" },
      { name: "password", label: "Contraseña", icon: "bi-lock", type: "password", placeholder: "Mínimo 6 caracteres" },
      { name: "confirmPassword", label: "Confirmar contraseña", icon: "bi-lock-fill", type: "password", placeholder: "Repite tu contraseña" }
    ]
  },
  profesor: { 
    color: "#1f1c64", 
    icon: "bi-person-badge-fill",
    title: "Docente",
    desc: "Construye tu reputación académica",
    fields: [
      { name: "nombres", label: "Nombres completos", icon: "bi-person", type: "text", placeholder: "Ej: María García" },
      { name: "email", label: "Correo institucional", icon: "bi-envelope", type: "email", placeholder: "profesor@universidad.edu.pe" },
      { name: "especialidad", label: "Área de especialidad", icon: "bi-bookmark", type: "text", placeholder: "Ej: Base de Datos" },
      { name: "universidad", label: "Universidad", icon: "bi-building", type: "text", placeholder: "Ej: PUCP, UNMSM, UPC" },
      { name: "password", label: "Contraseña", icon: "bi-lock", type: "password", placeholder: "Mínimo 6 caracteres" },
      { name: "confirmPassword", label: "Confirmar contraseña", icon: "bi-lock-fill", type: "password", placeholder: "Repite tu contraseña" }
    ]
  }
};

export default function Registro() {
  const navigate = useNavigate();
  const [role, setRole] = useState("estudiante");
  const [formData, setFormData] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentRole = roleOptions[role];

  const handleRoleChange = (newRole) => {
    if (newRole !== role) {
      setIsAnimating(true);
      setRole(newRole);
      setFormData({});
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { password, confirmPassword, email, nombres } = formData;
    
    if (!nombres || nombres.trim().length < 3) {
      Swal.fire({
        icon: "warning",
        title: "Campo incompleto",
        text: "Por favor ingresa tus nombres completos",
        confirmButtonColor: currentRole.color
      });
      return false;
    }

    if (!email || !email.includes("@")) {
      Swal.fire({
        icon: "warning",
        title: "Correo inválido",
        text: "Ingresa un correo electrónico válido",
        confirmButtonColor: currentRole.color
      });
      return false;
    }

    if (!password || password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Contraseña débil",
        text: "La contraseña debe tener al menos 6 caracteres",
        confirmButtonColor: currentRole.color
      });
      return false;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Contraseñas no coinciden",
        text: "Verifica que ambas contraseñas sean iguales",
        confirmButtonColor: currentRole.color
      });
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      const userData = {
        role: role,
        email: formData.email,
        nombres: formData.nombres,
        registeredAt: new Date().toISOString()
      };
      
      localStorage.setItem("userSession", JSON.stringify(userData));

      Swal.fire({
        title: "¡Registro exitoso!",
        text: `Bienvenido a ProfeMatch, ${formData.nombres.split(' ')[0]}`,
        icon: "success",
        timer: 2500,
        showConfirmButton: false,
        timerProgressBar: true,
        background: currentRole.color,
        color: "#fff",
        iconColor: "#fff"
      }).then(() => {
        const redirectPath = role === "estudiante" ? "/inicio-estudiante" : "/inicio-profesor";
        navigate(redirectPath);
      });
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <main className="container-fluid p-0 min-vh-100 overflow-hidden">
      <div className="row g-0 min-vh-100">
        <div className="col-lg-6 d-none d-lg-block p-0 position-relative">
          <LoginHero 
            video={heroVideo} 
            titulo="Únete a" 
            highlight="ProfeMatch" 
            subtitulo="Forma parte de la comunidad que está transformando la educación universitaria."
          />
          
          <div className="position-absolute bottom-0 start-0 p-5 w-100" 
               style={{ 
                 background: "linear-gradient(to top, rgba(24,15,42,0.95), transparent)",
                 zIndex: 2
               }}>
            <div className="row g-4">
              <div className="col-6">
                <div className="benefit-card-glass p-3 text-center">
                  <i className="bi bi-shield-check d-block mb-2"></i>
                  <small className="fw-bold">100% Seguro</small>
                </div>
              </div>
              <div className="col-6">
                <div className="benefit-card-glass p-3 text-center">
                  <i className="bi bi-people d-block mb-2"></i>
                  <small className="fw-bold">+1000 Usuarios</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 d-flex align-items-center justify-content-center position-relative px-3 px-md-4 py-5">
          <div className="position-absolute top-0 end-0 p-3 p-md-4">
            <span className="text-muted small">¿Ya tienes cuenta?</span>
            <Link to="/login" className="ms-2 fw-bold text-decoration-none small hover-link">
              Inicia sesión
            </Link>
          </div>

          <div className={`registro-card p-4 p-md-5 shadow-lg bg-white w-100 position-relative ${isAnimating ? 'role-swap' : ''}`} 
               style={{ zIndex: 1 }}>
            
            <div className="role-selector mb-4">
              <div className="row g-2">
                {Object.keys(roleOptions).map((r) => (
                  <div className="col" key={r}>
                    <button
                      type="button"
                      onClick={() => handleRoleChange(r)}
                      className={`role-btn w-100 py-3 d-flex align-items-center justify-content-center gap-2 ${role === r ? 'active' : ''}`}
                      style={{
                        background: role === r ? roleOptions[r].color : "#f8f9fa",
                        color: role === r ? "#fff" : "#64748b"
                      }}
                    >
                      <i className={`bi ${roleOptions[r].icon}`}></i>
                      <span className="fw-bold small text-capitalize">{roleOptions[r].title}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mb-4">
              <div className="icon-badge-mx-auto" style={{ backgroundColor: currentRole.color }}>
                <i className={`bi ${currentRole.icon}`}></i>
              </div>
              <h2 className="fw-bold text-dark mb-1">Crear cuenta</h2>
              <p className="text-muted small mb-0">Registro para <strong className="text-capitalize" style={{ color: 'var(--violet-main)' }}>{currentRole.title}</strong></p>
              <p className="text-muted small fst-italic mt-2">{currentRole.desc}</p>
            </div>

            <form onSubmit={handleRegister} className="mb-4">
              <div className="row g-3">
                {currentRole.fields.map((field) => (
                  <div className="col-12" key={field.name}>
                    <label className="form-label">
                      {field.label}
                    </label>
                    <div className="input-group">
                      <span className="input-group-text rounded-start-4">
                        <i className={`bi ${field.icon}`}></i>
                      </span>
                      <input
                        type={field.type}
                        name={field.name}
                        className="form-control py-3 rounded-end-4"
                        placeholder={field.placeholder}
                        value={formData[field.name] || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="form-check mt-4 mb-4">
                <input className="form-check-input" type="checkbox" id="terms" required />
                <label className="form-check-label small text-muted" htmlFor="terms">
                  Acepto los <a href="#!" className="fw-bold text-decoration-none" style={{ color: 'var(--violet-main)' }}>términos y condiciones</a> y la <a href="#!" className="fw-bold text-decoration-none" style={{ color: 'var(--violet-main)' }}>política de privacidad</a>
                </label>
              </div>

              <div className="d-grid gap-3">
                <button 
                  type="submit" 
                  className="btn btn-register py-3 shadow-lg border-0 fw-bold text-white"
                  disabled={isLoading}
                  style={{
                    background: `linear-gradient(135deg, ${currentRole.color} 0%, ${currentRole.color}dd 100%)`,
                    borderRadius: '12px'
                  }}
                >
                  {isLoading ? (
                    <span className="d-flex align-items-center justify-content-center gap-2">
                      <span className="spinner-border spinner-border-sm" role="status"></span>
                      Creando cuenta...
                    </span>
                  ) : (
                    <>
                      <i className="bi bi-person-plus me-2"></i>
                      Registrarme ahora
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="text-center position-relative my-4">
              <hr className="text-muted opacity-25" />
              <span className="position-absolute top-50 start-50 translate-middle px-3 bg-white text-muted small">
                O regístrate con
              </span>
            </div>

            <div className="row g-2 mb-3">
              <div className="col-6">
                <button className="btn btn-outline-secondary w-100 py-2 d-flex align-items-center justify-content-center gap-2">
                  <i className="bi bi-google text-danger"></i>
                  <span className="small">Google</span>
                </button>
              </div>
              <div className="col-6">
                <button className="btn btn-outline-secondary w-100 py-2 d-flex align-items-center justify-content-center gap-2">
                  <i className="bi bi-microsoft text-primary"></i>
                  <span className="small">Microsoft</span>
                </button>
              </div>
            </div>

            <div className="text-center mt-4 p-3" style={{ backgroundColor: '#f8f7ff', borderRadius: '12px' }}>
              <p className="small text-muted mb-0">
                <i className="bi bi-info-circle me-2" style={{ color: 'var(--violet-main)' }}></i>
                Al registrarte, aceptas recibir actualizaciones académicas
              </p>
            </div>
          </div>
        </div>
      </div>

      <WhatsappBtn />
    </main>
  );
}