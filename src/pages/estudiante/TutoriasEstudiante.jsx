import React from "react";
import Sidebar from "../../components/Sidebar";
import ProfesorCard from "../../components/ProfesorCard";
import { profesoresData } from "../../data/profesoresData";
import Swal from "sweetalert2";

export default function TutoriasEstudiante() {

  // MANEJADOR PRINCIPAL: Abre el modal interactivo al dar clic en "Solicitar"
  const handleSolicitarClick = (profe) => {
    const cursoSugerido = profe.materia || profe.especialidad || "Asesoría Académica";

    Swal.fire({
      title: `<span style="color: #3F51B5; font-weight: bold;">📅 Agendar Tutoría</span>`,
      html: `
        <p class="text-muted small mb-3">Estás reservando una sesión con el <b>${profe.nombre}</b></p>
        <div style="text-align: left; margin-bottom: 15px;">
          <label style="font-weight: 600; font-size: 0.85rem; color: #555;">Curso o Tema:</label>
          <input id="swal-curso" class="swal2-input" style="margin: 5px 0 0 0; width: 100%; box-sizing: border-box;" value="${cursoSugerido}">
        </div>
        <div style="text-align: left;">
          <label style="font-weight: 600; font-size: 0.85rem; color: #555;">Selecciona la Fecha:</label>
          <input id="swal-fecha" type="date" class="swal2-input" style="margin: 5px 0 0 0; width: 100%; box-sizing: border-box;" value="${new Date().toISOString().split('T')[0]}">
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Confirmar Reserva",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3F51B5",
      cancelButtonColor: "#6c757d",
      preConfirm: () => {
        const curso = document.getElementById("swal-curso").value;
        const fecha = document.getElementById("swal-fecha").value;
        
        if (!curso.trim() || !fecha) {
          Swal.showValidationMessage("Por favor, completa todos los campos");
          return false;
        }
        return { curso, fecha };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { curso, fecha } = result.value;
        ejecutarFlujoReserva(profe.nombre, curso, fecha);
      }
    });
  };

  // PROCESAMIENTO: Guarda datos en localStorage y dispara el evento global
  const ejecutarFlujoReserva = (nombreProfesor, cursoElegido, fechaElegida) => {
    const partes = fechaElegida.split("-");
    const fechaFormateada = partes.length === 3 ? `${partes[2]}/${partes[1]}/${partes[0]}` : fechaElegida;

    // 1. CREAMOS EL OBJETO DE LA NUEVA NOTIFICACIÓN
    const nuevaAlerta = {
      id: Date.now(),
      mensaje: `¡Nueva tutoría agendada! El alumno Dennis Mendoza ha reservado una sesión de ${cursoElegido} para el ${fechaFormateada}.`,
      leida: false
    };

    // 2. [ACTUALIZADO] PERSISTENCIA DE ALERTAS: Guardamos directamente en el almacén que leerá el Sidebar
    const alertasPreinstaladas = [
      { id: 1, mensaje: "Tu tutoría con Luis Carlos ha sido confirmada.", leida: false },
      { id: 2, mensaje: "Alerta: El estudiante Carlos Mendoza canceló la tutoría de hoy.", leida: false }
    ];

    // Intentamos leer si ya existen alertas en el localStorage; si no, usamos las precargadas
    const alertasActuales = JSON.parse(localStorage.getItem("alertas_visuales")) || alertasPreinstaladas;
    
    // Añadimos la nueva alerta al principio del array
    const listaAlertasActualizada = [nuevaAlerta, ...alertasActuales];
    localStorage.setItem("alertas_visuales", JSON.stringify(listaAlertasActualizada));

    // 3. DISPARAR EVENTO PERSONALIZADO (Por si necesitas feedback inmediato en la misma vista)
    const eventoNotificacion = new CustomEvent("nueva_notificacion_tutoria", {
      detail: nuevaAlerta
    });
    window.dispatchEvent(eventoNotificacion);

    // 4. AGREGAR A LOCALSTORAGE (Para la sección de "Sesiones Vigentes" del perfil docente)
    const tutoriasActuales = JSON.parse(localStorage.getItem("tutorias")) || [];
    const nuevaSesion = {
      estudiante: "Dennis Mendoza A.",
      curso: cursoElegido,
      fecha: fechaElegida 
    };
    localStorage.setItem("tutorias", JSON.stringify([nuevaSesion, ...tutoriasActuales]));

    // 5. NOTIFICACIÓN DE ÉXITO PARA EL ESTUDIANTE
    Swal.fire({
      title: "¡Reserva Exitosa!",
      text: `Tu tutoría de ${cursoElegido} ha sido registrada. Se notificó al docente.`,
      icon: "success",
      confirmButtonColor: "#493774"
    });
  };

  return (
    <div className="main-layout">
      <Sidebar role="estudiante" />

      <main className="dashboard-content">
        {/* Cabecera de la sección */}
        <header className="mb-4">
          <h2 className="fw-bold text-indigo">Tutorías Disponibles</h2>
          <p className="text-muted">Conecta con profesores expertos para tutorías personalizadas.</p>
        </header>

        {/* Banner Informativo */}
        <section className="alert border-0 rounded-4 p-4 mb-5" style={{ backgroundColor: "#f0f4ff", border: "1px solid #d0e0ff" }}>
          <div className="d-flex gap-3">
            <div className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: "45px", height: "45px", minWidth: "45px" }}>
              <i className="bi bi-calendar-check text-primary fs-4"></i>
            </div>
            <div>
              <h6 className="fw-bold text-dark mb-2">¿Cómo funcionan las tutorías?</h6>
              <ul className="small text-secondary mb-0 ps-3">
                <li>Busca un profesor disponible en el tema que necesitas.</li>
                <li>Revisa su calificación, precio and disponibilidad.</li>
                <li>Solicita una sesión de tutoría directamente.</li>
                <li>Coordina horarios y modalidad (presencial u online).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* REJILLA DE TARJETAS DE PROFESORES */}
        <section className="row g-4">
          {profesoresData.map((profe) => (
            <div key={profe.id} className="col-md-6 col-lg-4">
              <ProfesorCard 
                profesor={profe} 
                isTutoria={true} 
                onSolicitar={() => handleSolicitarClick(profe)}
              />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}