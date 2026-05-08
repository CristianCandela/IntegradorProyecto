import Sidebar from "../../components/Sidebar";

export default function TutoriasEstudiante() {
  return (
    <div className="d-flex"> 
      <Sidebar role="estudiante" />
      
      <div className="flex-grow-1 p-5" style={{ marginLeft: "70px" }}>
        <h1 className="fw-bold text-indigo">Panel del Estudiante</h1>
        <p>¡Hola! Busca y evalúa a tus profesores aquí.</p>
      </div>
    </div>
  );
}