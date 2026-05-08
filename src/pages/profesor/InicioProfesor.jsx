import Sidebar from "../../components/Sidebar";

export default function InicioProfesor() {
  return (
    <div className="d-flex">
        <Sidebar role="profesor" />

        <div className="flex-grow-1 p-5" style={{ marginLeft: "70px" }}>
            <h1 className="fw-bold text-indigo">Panel del Profesor</h1>
            <p>Aquí podrás ver tus evaluaciones y recomendaciones.</p>
        </div>
    </div>
  );
}
