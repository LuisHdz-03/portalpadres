// src/App.tsx
import { useState } from "react";
import {
  Menu,
  X,
  User,
  Users,
  CalendarCheck,
  AlertTriangle,
  DoorOpen,
  ArrowLeft,
} from "lucide-react";
import "./App.css";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [vistaActual, setVistaActual] = useState("inicio");

  const handleLogout = () => {
    localStorage.removeItem("autenticado");
    window.location.href = "/login";
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="menu-toggle"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
          <h1 className="header-title">CETIS No. 27 - Portal de Padres</h1>
        </div>

        <button onClick={handleLogout} className="btn-logout">
          Cerrar Sesión
        </button>
      </header>

      <div className="app-content-wrapper">
        <nav className={`app-sidebar ${isCollapsed ? "collapsed" : ""}`}>
          <div className="info-item">
            <strong className="info-label">
              <User size={18} /> Alumno:
            </strong>
            <p>Nombre del Alumno</p>
            <br />
            <strong className="info-label">
              <Users size={18} /> Grupo:
            </strong>
            <p>6º A - Especialidad</p>
          </div>
          <hr className="divider" />

          <div className="menu-links">
            <p
              className={`menu-item ${vistaActual === "inicio" ? "active" : ""}`}
              onClick={() => setVistaActual("inicio")}
            >
              <User size={20} /> Inicio
            </p>
            <p
              className={`menu-item ${vistaActual === "asistencias" ? "active" : ""}`}
              onClick={() => setVistaActual("asistencias")}
            >
              <CalendarCheck size={20} /> Asistencias
            </p>
            <p
              className={`menu-item ${vistaActual === "reportes" ? "active" : ""}`}
              onClick={() => setVistaActual("reportes")}
            >
              <AlertTriangle size={20} /> Reportes
            </p>
            <p
              className={`menu-item ${vistaActual === "registros" ? "active" : ""}`}
              onClick={() => setVistaActual("registros")}
            >
              <DoorOpen size={20} /> Accesos
            </p>
          </div>
        </nav>

        <main className="app-main">
          {vistaActual === "inicio" && (
            <>
              <header className="main-header">
                <h2 className="welcome-text">Estatus Académico</h2>
                <p className="welcome-subtext">
                  Información actualizada al día de hoy.
                </p>
              </header>

              <div className="dashboard-grid">
                <div className="dashboard-card">
                  <div className="card-icon">
                    <CalendarCheck size={40} />
                  </div>
                  <h3>Asistencias por Materia</h3>
                  <p className="card-data">95% promedio</p>
                  <button
                    className="card-btn"
                    onClick={() => setVistaActual("asistencias")}
                  >
                    Ver detalle
                  </button>
                </div>

                <div className="dashboard-card">
                  <div className="card-icon">
                    <AlertTriangle size={40} />
                  </div>
                  <h3>Reportes</h3>
                  <p className="card-data">0 reportes</p>
                  <button
                    className="card-btn"
                    onClick={() => setVistaActual("reportes")}
                  >
                    Ver historial
                  </button>
                </div>

                <div className="dashboard-card">
                  <div className="card-icon">
                    <DoorOpen size={40} />
                  </div>
                  <h3>Entrada / Salida</h3>
                  <p className="card-data">Entrada: 07:05 AM</p>
                  <p className="card-subdata">Salida: --:--</p>
                  <button
                    className="card-btn"
                    onClick={() => setVistaActual("registros")}
                  >
                    Ver registros
                  </button>
                </div>
              </div>
            </>
          )}

          {vistaActual === "asistencias" && (
            <div>
              <button
                className="btn-back"
                onClick={() => setVistaActual("inicio")}
              >
                <ArrowLeft size={18} /> Volver al inicio
              </button>
              <h2 className="welcome-text">Detalle de Asistencias</h2>
              <p className="welcome-subtext">
                Aquí irá la tabla con las asistencias por materia y fecha.
              </p>
              <div className="content-box">
                <p>En construcción: Conectando con API...</p>
              </div>
            </div>
          )}

          {vistaActual === "reportes" && (
            <div>
              <button
                className="btn-back"
                onClick={() => setVistaActual("inicio")}
              >
                <ArrowLeft size={18} /> Volver al inicio
              </button>
              <h2 className="welcome-text">Historial de Reportes</h2>
              <p className="welcome-subtext">
                Registro de incidencias disciplinarias o académicas.
              </p>
              <div className="content-box">
                <p>En construcción: Conectando con API...</p>
              </div>
            </div>
          )}

          {vistaActual === "registros" && (
            <div>
              <button
                className="btn-back"
                onClick={() => setVistaActual("inicio")}
              >
                <ArrowLeft size={18} /> Volver al inicio
              </button>
              <h2 className="welcome-text">Registro de Accesos</h2>
              <p className="welcome-subtext">
                Historial de entradas y salidas del plantel por día.
              </p>
              <div className="content-box">
                <p>En construcción: Conectando con API...</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
