import {
  ArrowLeft,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Acceso } from "../types";

import "../styles/Registros.css";

interface Paginacion {
  paginaActual: number;
  totalRegistros: number;
  totalPaginas: number;
  limite: number;
}

interface Props {
  accesos: Acceso[];
  cargando: boolean;
  onVolver: () => void;

  paginacion: Paginacion | null;

  cambiarPagina: (pagina: number) => void;
}

const formatearFechaHora = (fechaISO: string) => {
  const fecha = new Date(fechaISO);

  return fecha.toLocaleString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const getAccesoClass = (tipo: string) => {
  const tipoNormalizado = tipo.toLowerCase();

  if (tipoNormalizado.includes("entrada")) return "status-entrada";

  if (tipoNormalizado.includes("salida")) return "status-salida";

  return "status-default";
};

export default function RegistrosView({
  accesos,
  cargando,
  onVolver,
  paginacion,
  cambiarPagina,
}: Props) {
  return (
    <div>
      <button className="btn-back" onClick={onVolver}>
        <ArrowLeft size={18} />
        Volver al inicio
      </button>

      <h2 className="welcome-text">Registro de Accesos</h2>

      <p className="welcome-subtext">
        Historial de entradas y salidas del plantel.
      </p>

      <div className="content-box">
        {cargando ? (
          <p>Cargando registros de acceso...</p>
        ) : accesos.length > 0 ? (
          <>
            <div className="table-responsive">
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Fecha y hora</th>

                    <th>Tipo</th>
                  </tr>
                </thead>

                <tbody>
                  {accesos.map((acceso) => (
                    <tr key={acceso.idAcceso}>
                      <td data-label="Fecha">
                        <div className="date-cell">
                          <CalendarDays size={17} />

                          <span>{formatearFechaHora(acceso.fechaHora)}</span>
                        </div>
                      </td>

                      <td data-label="Tipo">
                        <span className={getAccesoClass(acceso.tipo)}>
                          {acceso.tipo}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {paginacion && (
              <div className="pagination-container">
                <button
                  className="pagination-btn"
                  disabled={paginacion.paginaActual === 1}
                  onClick={() => cambiarPagina(paginacion.paginaActual - 1)}
                >
                  <ChevronLeft size={18} />
                  Anterior
                </button>

                <div className="pagination-info">
                  Página <strong>{paginacion.paginaActual}</strong> de{" "}
                  <strong>{paginacion.totalPaginas}</strong>
                  <br />
                  <span>{paginacion.totalRegistros} registros </span>
                </div>

                <button
                  className="pagination-btn"
                  disabled={paginacion.paginaActual === paginacion.totalPaginas}
                  onClick={() => cambiarPagina(paginacion.paginaActual + 1)}
                >
                  Siguiente
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        ) : (
          <p>No hay registros de acceso disponibles.</p>
        )}
      </div>
    </div>
  );
}
