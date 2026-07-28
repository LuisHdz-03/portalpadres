import { ArrowLeft, CalendarDays, UserCheck } from "lucide-react";
import type { Reporte } from "../types";

interface Props {
  reportes: Reporte[];
  cargando: boolean;
  onVolver: () => void;
}

const formatearFecha = (fechaISO: string) => {
  const fecha = new Date(fechaISO);
  return fecha.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getBadgeClass = (nivel: string) => {
  const n = nivel.toLowerCase();
  if (n.includes("leve")) return "badge-leve";
  if (n.includes("moderado") || n.includes("medio")) return "badge-moderado";
  if (n.includes("grave") || n.includes("alto")) return "badge-grave";
  return "badge-default";
};

export default function ReportesView({ reportes, cargando, onVolver }: Props) {
  return (
    <div>
      <button className="btn-back" onClick={onVolver}>
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
      ) : reportes.length > 0 ? (
        <div className="reports-grid">
          {reportes.map((reporte) => (
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
                      <span className="report-label">Reportado por</span>
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
                    <p className="report-desc-text">{reporte.descripcion}</p>
                  </div>
                </div>
              </div>

              <div className="report-footer">
                <div className="report-item">
                  <span className="report-label">Estatus</span>
                  <span className="report-status">{reporte.estatus}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="content-box">
          <p>Excelente, no hay reportes registrados para este alumno.</p>
        </div>
      )}
    </div>
  );
}
