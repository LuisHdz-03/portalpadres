// src/App.tsx
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  User,
  Users,
  CalendarCheck,
  AlertTriangle,
  DoorOpen,
  ArrowLeft,
  CalendarDays,
  UserCheck,
} from "lucide-react";
import { getEstatusCompletoAPI } from "./api/portal";
import "./App.css";
import type { EstatusData } from "./types";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [vistaActual, setVistaActual] = useState("inicio");

  const [cargando, setCargando] = useState(true);
  const [estatus, setEstatus] = useState<EstatusData | null>(null);

  const token = localStorage.getItem("tokenPadre") || "";
  const alumnoGuardado = localStorage.getItem("alumnoData");
  const alumno = alumnoGuardado
    ? JSON.parse(alumnoGuardado)
    : { id: 0, nombre: "Cargando...", grupo: "Cargando..." };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  useEffect(() => {
    const cargarDatos = async () => {
      if (alumno.id && token) {
        try {
          const dataEstatus = await getEstatusCompletoAPI(alumno.id, token);
          setEstatus(dataEstatus);
        } catch (error) {
          console.error("Error al cargar los datos del estatus:", error);
        } finally {
          setCargando(false);
        }
      }
    };
    cargarDatos();
  }, [alumno.id, token]);

  // Formateador de fechas
  const formatearFecha = (fechaISO: string) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatearFechaHora = (fechaISO: string) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleString("es-MX", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // Asignar color dinámico a la etiqueta de nivel del reporte
  const getBadgeClass = (nivel: string) => {
    const n = nivel.toLowerCase();
    if (n.includes("leve")) return "badge-leve";
    if (n.includes("moderado") || n.includes("medio")) return "badge-moderado";
    if (n.includes("grave") || n.includes("alto")) return "badge-grave";
    return "badge-default";
  };

  const getAccesoClass = (tipo: string) => {
    const tipoNormalizado = tipo.toLowerCase();
    if (tipoNormalizado.includes("entrada")) return "status-entrada";
    if (tipoNormalizado.includes("salida")) return "status-salida";
    return "status-default";
  };

  const accesosOrdenados = [...(estatus?.accesos || [])].sort(
    (a, b) => new Date(b.fechaHora).getTime() - new Date(a.fechaHora).getTime(),
  );

  // Obtener el último acceso de entrada y salida
  const ultimoAccesoEntrada = accesosOrdenados.find(
    (a) => a.tipo === "ENTRADA",
  );
  const ultimoAccesoSalida = accesosOrdenados.find((a) => a.tipo === "SALIDA");

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
            <p>{alumno.nombre}</p>
            <br />
            <strong className="info-label">
              <Users size={18} /> Grupo:
            </strong>
            <p>{alumno.grupo}</p>
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
                  Resumen general del estudiante actualizado al día de hoy.
                </p>
              </header>

              {cargando ? (
                <div className="content-box">
                  <p>Cargando información desde el servidor...</p>
                </div>
              ) : (
                <div className="dashboard-grid">
                  <div className="dashboard-card">
                    <div className="card-icon">
                      <CalendarCheck size={40} />
                    </div>
                    <h3>Asistencias por Materia</h3>
                    <p className="card-data">
                      {(() => {
                        const asistencias = estatus?.asistencias || [];
                        if (asistencias.length === 0) return 100;
                        const presentes = asistencias.filter(
                          (a) => a.estatus === "PRESENTE",
                        ).length;
                        return Math.round(
                          (presentes / asistencias.length) * 100,
                        );
                      })()}
                      %
                    </p>
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
                    <h3>Reportes Disciplinarios</h3>
                    <p className="card-data">
                      {estatus?.reportes?.length || 0}
                    </p>
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
                    <p className="card-data">
                      Entrada:{" "}
                      {ultimoAccesoEntrada
                        ? formatearFechaHora(ultimoAccesoEntrada.fechaHora)
                        : "--:--"}
                    </p>
                    <p className="card-subdata">
                      Salida:{" "}
                      {ultimoAccesoSalida
                        ? formatearFechaHora(ultimoAccesoSalida.fechaHora)
                        : "--:--"}
                    </p>
                    <button
                      className="card-btn"
                      onClick={() => setVistaActual("registros")}
                    >
                      Ver registros
                    </button>
                  </div>
                </div>
              )}
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
                Historial de asistencias registradas por los docentes.
              </p>

              <div className="content-box table-responsive">
                {cargando ? (
                  <p>Cargando asistencias...</p>
                ) : estatus?.asistencias && estatus.asistencias.length > 0 ? (
                  <table className="attendance-table">
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Materia</th>
                        <th>Estatus</th>
                      </tr>
                    </thead>
                    <tbody>
                      {estatus.asistencias.map((asistencia) => (
                        <tr key={asistencia.idAsistencia}>
                          <td>
                            <div className="info-label">
                              <CalendarDays size={16} />
                              {formatearFecha(asistencia.fecha)}
                            </div>
                          </td>
                          <td>{asistencia.materia}</td>
                          <td>
                            <span
                              className={
                                asistencia.estatus === "PRESENTE"
                                  ? "status-presente"
                                  : "status-ausente"
                              }
                            >
                              {asistencia.estatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No hay registros de asistencias disponibles.</p>
                )}
              </div>
            </div>
          )}

          {/* =========================================
              VISTA 3: REPORTES
              ========================================= */}
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

              {cargando ? (
                <div className="content-box">
                  <p>Cargando reportes...</p>
                </div>
              ) : estatus?.reportes && estatus.reportes.length > 0 ? (
                <div className="reports-grid">
                  {estatus.reportes.map((reporte) => (
                    <div key={reporte.idReporte} className="report-card">
                      <div className="report-header">
                        <h3 className="report-title">{reporte.titulo}</h3>
                        <span
                          className={`report-badge ${getBadgeClass(reporte.nivel)}`}
                        >
                          {reporte.nivel}
                        </span>
                      </div>

                      <div className="report-body">
                        <div className="report-info-grid">
                          <div className="report-item">
                            <span className="report-label">Fecha</span>
                            <span className="report-value info-label">
                              <CalendarDays size={14} />
                              {formatearFecha(reporte.fecha)}
                            </span>
                          </div>
                          {reporte.reportadoPor && (
                            <div className="report-item">
                              <span className="report-label">
                                Reportado por
                              </span>
                              <span className="report-value info-label">
                                <UserCheck size={16} /> {reporte.reportadoPor}
                              </span>
                            </div>
                          )}
                          {reporte.docente !== "Administración" && (
                            <div className="report-item">
                              <span className="report-label">Reportó</span>
                              <span className="report-value info-label">
                                <UserCheck size={14} />
                                {reporte.docente}
                              </span>
                            </div>
                          )}
                          <div className="report-item">
                            <span className="report-label">Tipo</span>
                            <span className="report-value">
                              {reporte.tipoIncidencia}
                            </span>
                          </div>
                        </div>

                        <div className="report-item">
                          <span className="report-label">Descripción</span>
                          <div className="report-desc-box">
                            <p className="report-desc-text">
                              {reporte.descripcion}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="report-footer">
                        <div className="report-item">
                          <span className="report-label">Estatus</span>
                          <span className="report-status">
                            {reporte.estatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="content-box">
                  <p>
                    Excelente, no hay reportes registrados para este alumno.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* =========================================
              VISTA 4: REGISTROS DE ACCESO
              ========================================= */}
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
                Historial de entradas y salidas del plantel.
              </p>

              <div className="content-box table-responsive">
                {cargando ? (
                  <p>Cargando registros de acceso...</p>
                ) : accesosOrdenados.length > 0 ? (
                  <table className="attendance-table">
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Tipo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accesosOrdenados.map((acceso) => (
                        <tr key={acceso.idAcceso}>
                          <td>
                            <div className="info-label">
                              <CalendarDays size={16} />
                              {formatearFechaHora(acceso.fechaHora)}
                            </div>
                          </td>
                          <td>
                            <span className={getAccesoClass(acceso.tipo)}>
                              {acceso.tipo}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No hay registros de acceso disponibles en este momento.</p>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
