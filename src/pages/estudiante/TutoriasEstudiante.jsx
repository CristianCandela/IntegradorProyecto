import Sidebar from "../../components/Sidebar";
import ProfesorCard from "../../components/ProfesorCard"; // Importamos tu componente con modal
import { profesoresData } from "../../data/profesoresData";

export default function TutoriasEstudiante() {
  return (
    <div className="main-layout">
      <Sidebar role="estudiante" />

      <main className="dashboard-content">
        {/* Cabecera de la sección */}
        <header className="mb-4">
          <h2 className="fw-bold text-indigo">Tutorías Disponibles</h2>
          <p className="text-muted">Conecta con profesores expertos para tutorías personalizadas.</p>
        </header>

        {/* Banner Informativo (Estilo Figma) */}
        <section className="alert border-0 rounded-4 p-4 mb-5" style={{ backgroundColor: "#f0f4ff", border: "1px solid #d0e0ff" }}>
          <div className="d-flex gap-3">
            <div className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: "45px", height: "45px", minWidth: "45px" }}>
              <i className="bi bi-calendar-check text-primary fs-4"></i>
            </div>
            <div>
              <h6 className="fw-bold text-dark mb-2">¿Cómo funcionan las tutorías?</h6>
              <ul className="small text-secondary mb-0 ps-3">
                <li>Busca un profesor disponible en el tema que necesitas.</li>
                <li>Revisa su calificación, precio y disponibilidad.</li>
                <li>Solicita una sesión de tutoría directamente.</li>
                <li>Coordina horarios y modalidad (presencial u online).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Grilla de Profesores para Tutoría */}
        <section className="row g-4">
          {profesoresData.map((profe) => (
            <div key={profe.id} className="col-md-6 col-lg-4">
              
              {/* Aquí es donde sucede la magia: 
                  Usamos el componente ProfesorCard con la prop isTutoria={true}.
                  Esto reemplaza todo el HTML manual y activa el MODAL del perfil.
              */}
              <ProfesorCard 
                profesor={profe} 
                isTutoria={true} 
              />

            </div>
          ))}
        </section>
      </main>
    </div>
  );
}