import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  Users,
  CalendarCheck,
  AlertTriangle,
  DoorOpen,
  LogOut,
} from "lucide-react";

import {
  getResumenAlumnoAPI,
  getAsistenciasAlumnoAPI,
  getReportesAlumnoAPI,
  getAccesosAlumnoAPI,
} from "./api/portal";

import AsistenciasView from "./views/AsistenciasView";
import ReportesView from "./views/ReportesView";
import RegistrosView from "./views/RegistrosView";

import "./App.css";

function App() {
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const [vistaActual, setVistaActual] = useState("inicio");

  const [cargando, setCargando] = useState(true);

  // ============================
  // DATOS SEPARADOS
  // ============================

  const [resumen, setResumen] = useState<any>(null);

  const [asistencias, setAsistencias] = useState<any[]>([]);

  const [reportes, setReportes] = useState<any[]>([]);

  const [accesos, setAccesos] = useState<any[]>([]);

  const [paginacionAccesos, setPaginacionAccesos] = useState<any>(null);

  const token = localStorage.getItem("tokenPadre") || "";

  const alumnoGuardado = localStorage.getItem("alumnoData");

  const alumno = alumnoGuardado
    ? JSON.parse(alumnoGuardado)
    : {
        id: 0,
        nombre: "Cargando...",
        grupo: "Cargando...",
      };

  const handleLogout = () => {
    localStorage.clear();

    navigate("/login", {
      replace: true,
    });
  };

  // ============================
  // CARGAR DATOS
  // ============================

  useEffect(() => {
    const cargarDatos = async () => {
      if (!alumno.id || !token) {
        setCargando(false);
        return;
      }

      try {
        const [resumenData, asistenciasData, reportesData, accesosData] =
          await Promise.all([
            getResumenAlumnoAPI(alumno.id, token),

            getAsistenciasAlumnoAPI(alumno.id, token),

            getReportesAlumnoAPI(alumno.id, token),

            getAccesosAlumnoAPI(alumno.id, token, 1, 10),
          ]);

        setResumen(resumenData.resumen);

        setAsistencias(asistenciasData.asistencias || []);

        setReportes(reportesData.reportes || []);

        setAccesos(accesosData.accesos || []);

        setPaginacionAccesos(accesosData.paginacion || null);
      } catch (error) {
        console.error("Error cargando portal:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [alumno.id, token]);

  const cambiarPaginaAccesos = async (pagina: number) => {
    try {
      const data = await getAccesosAlumnoAPI(alumno.id, token, pagina, 10);

      setAccesos(data.accesos || []);

      setPaginacionAccesos(data.paginacion || null);
    } catch (error) {
      console.error("Error cambiando página de accesos:", error);
    }
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

  const accesosOrdenados = [...accesos].sort(
    (a, b) => new Date(b.fechaHora).getTime() - new Date(a.fechaHora).getTime(),
  );

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
          <LogOut size={18} />

          <span>Cerrar Sesión</span>
        </button>
      </header>

      <div className="app-content-wrapper">
        <nav className={`app-sidebar ${isCollapsed ? "collapsed" : ""}`}>
          <div className="info-item">
            <strong className="info-label">
              <User size={18} />
              Alumno:
            </strong>

            <p>{resumen?.nombreCompleto || alumno.nombre}</p>

            <br />

            <strong className="info-label">
              <Users size={18} />
              Grupo:
            </strong>

            <p>{resumen?.grupo?.nombre || alumno.grupo}</p>
          </div>

          <hr className="divider" />

          <div className="menu-links">
            <p
              className={`menu-item ${
                vistaActual === "inicio" ? "active" : ""
              }`}
              onClick={() => setVistaActual("inicio")}
            >
              <User size={20} />
              Inicio
            </p>

            <p
              className={`menu-item ${
                vistaActual === "asistencias" ? "active" : ""
              }`}
              onClick={() => setVistaActual("asistencias")}
            >
              <CalendarCheck size={20} />
              Asistencias
            </p>

            <p
              className={`menu-item ${
                vistaActual === "reportes" ? "active" : ""
              }`}
              onClick={() => setVistaActual("reportes")}
            >
              <AlertTriangle size={20} />
              Reportes
            </p>

            <p
              className={`menu-item ${
                vistaActual === "registros" ? "active" : ""
              }`}
              onClick={() => setVistaActual("registros")}
            >
              <DoorOpen size={20} />
              Accesos
            </p>
          </div>
        </nav>

        <main className="app-main">
          {vistaActual === "inicio" && (
            <>
              <header className="main-header">
                <h2 className="welcome-text">Estatus Académico</h2>

                <p className="welcome-subtext">
                  Resumen general del estudiante.
                </p>
              </header>

              {cargando ? (
                <div className="content-box">Cargando información...</div>
              ) : (
                <div className="dashboard-grid">
                  <div className="dashboard-card">
                    <CalendarCheck size={40} />

                    <h3>Asistencia</h3>

                    <p className="card-data">
                      {asistencias.length
                        ? Math.round(
                            (asistencias.filter((a) => a.estatus === "PRESENTE")
                              .length /
                              asistencias.length) *
                              100,
                          )
                        : 100}
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
                    <AlertTriangle size={40} />

                    <h3>Reportes</h3>

                    <p className="card-data">{reportes.length}</p>

                    <button
                      className="card-btn"
                      onClick={() => setVistaActual("reportes")}
                    >
                      Ver historial
                    </button>
                  </div>

                  <div className="dashboard-card">
                    <DoorOpen size={40} />

                    <h3>Entrada / Salida</h3>

                    <p className="card-data">
                      Entrada:
                      {ultimoAccesoEntrada
                        ? formatearFechaHora(ultimoAccesoEntrada.fechaHora)
                        : "--"}
                    </p>

                    <p className="card-subdata">
                      Salida:
                      {ultimoAccesoSalida
                        ? formatearFechaHora(ultimoAccesoSalida.fechaHora)
                        : "--"}
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
            <AsistenciasView
              asistencias={asistencias}
              cargando={cargando}
              onVolver={() => setVistaActual("inicio")}
            />
          )}

          {vistaActual === "reportes" && (
            <ReportesView
              reportes={reportes}
              cargando={cargando}
              onVolver={() => setVistaActual("inicio")}
            />
          )}

          {vistaActual === "registros" && (
            <RegistrosView
              accesos={accesos}
              cargando={cargando}
              paginacion={paginacionAccesos}
              cambiarPagina={cambiarPaginaAccesos}
              onVolver={() => setVistaActual("inicio")}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
