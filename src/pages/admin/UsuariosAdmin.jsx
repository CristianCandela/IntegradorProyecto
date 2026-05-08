import Sidebar from "../../components/Sidebar";

export default function UsuariosAdmin() {
  return (
    <div className="d-flex">
        <Sidebar role="admin" />

        <div className="flex-grow-1 p-5" style={{ marginLeft: "70px" }}>
            <h1 className="fw-bold">Panel de Administrador</h1>
            <p>Bienvenido, aquí gestionarás la plataforma ProfeMatch.</p>
        </div>
    </div>
  );
}
