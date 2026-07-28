// src/views/AsistenciasView.tsx
import { useState, useMemo } from "react";
import { ArrowLeft, CalendarDays, ChevronDown, ChevronUp } from "lucide-react";
import type { Asistencia } from "../types";
import "../styles/Asistencias.css";

interface Props {
  asistencias: Asistencia[];
  cargando: boolean;
  onVolver: () => void;
}

type ResumenMateria = {
  registros: Asistencia[];
  presentes: number;
  retardos: number;
  faltas: number;
};

const formatearFecha = (fechaISO: string) => {
  const fecha = new Date(fechaISO);
  return fecha.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function AsistenciasView({
  asistencias,
  cargando,
  onVolver,
}: Props) {
  const [materiaExpandida, setMateriaExpandida] = useState<string | null>(null);

  // Agrupamos por materia y calculamos el resumen de cada una
  const materiasAgrupadas = useMemo(() => {
    const grupos = new Map<string, ResumenMateria>();

    for (const a of asistencias) {
      if (!grupos.has(a.materia)) {
        grupos.set(a.materia, {
          registros: [],
          presentes: 0,
          retardos: 0,
          faltas: 0,
        });
      }
      const grupo = grupos.get(a.materia)!;
      grupo.registros.push(a);
      if (a.estatus === "PRESENTE") grupo.presentes++;
      else if (a.estatus === "RETARDO") grupo.retardos++;
      else if (a.estatus === "FALTA") grupo.faltas++;
    }

    return Array.from(grupos.entries())
      .map(([materia, datos]) => ({
        materia,
        ...datos,
        registros: [...datos.registros].sort(
          (a: Asistencia, b: Asistencia) =>
            new Date(b.fecha).getTime() - new Date(a.fecha).getTime(),
        ),
        porcentaje: Math.round(
          (datos.presentes / datos.registros.length) * 100,
        ),
      }))
      .sort((a, b) =>
        a.materia.localeCompare(b.materia, "es", { sensitivity: "base" }),
      );
  }, [asistencias]);

  const toggleMateria = (materia: string) => {
    setMateriaExpandida((actual) => (actual === materia ? null : materia));
  };

  return (
    <div>
      <button className="btn-back" onClick={onVolver}>
        <ArrowLeft size={18} /> Volver al inicio
      </button>
      <h2 className="welcome-text">Detalle de Asistencias</h2>
      <p className="welcome-subtext">
        Historial de asistencias registradas por los docentes, agrupado por
        materia.
      </p>

      {cargando ? (
        <div className="content-box">
          <p>Cargando asistencias...</p>
        </div>
      ) : materiasAgrupadas.length === 0 ? (
        <div className="content-box">
          <p>No hay registros de asistencias disponibles.</p>
        </div>
      ) : (
        <div className="materias-grid">
          {materiasAgrupadas.map((grupo) => {
            const expandida = materiaExpandida === grupo.materia;
            return (
              <div key={grupo.materia} className="materia-card">
                <button
                  className="materia-card-header"
                  onClick={() => toggleMateria(grupo.materia)}
                  aria-expanded={expandida}
                >
                  <div className="materia-card-titulo">
                    <h3>{grupo.materia}</h3>
                    <span className="materia-porcentaje">
                      {grupo.porcentaje}%
                    </span>
                  </div>
                  <div className="materia-card-resumen">
                    <span className="resumen-presente">
                      {grupo.presentes} presentes
                    </span>
                    {grupo.retardos > 0 && (
                      <span className="resumen-retardo">
                        {grupo.retardos} retardos
                      </span>
                    )}
                    {grupo.faltas > 0 && (
                      <span className="resumen-falta">
                        {grupo.faltas} faltas
                      </span>
                    )}
                  </div>
                  {expandida ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>

                {expandida && (
                  <div className="materia-card-detalle table-responsive">
                    <table className="attendance-table">
                      <thead>
                        <tr>
                          <th>Fecha</th>
                          <th>Estatus</th>
                        </tr>
                      </thead>
                      <tbody>
                        {grupo.registros.map((a: Asistencia) => (
                          <tr key={a.idAsistencia}>
                            <td data-label="Fecha">
                              <div className="info-label">
                                <CalendarDays size={16} />
                                {formatearFecha(a.fecha)}
                              </div>
                            </td>
                            <td data-label="Estatus">
                              <span
                                className={
                                  a.estatus === "PRESENTE"
                                    ? "status-presente"
                                    : a.estatus === "RETARDO"
                                      ? "status-retardo"
                                      : "status-ausente"
                                }
                              >
                                {a.estatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
