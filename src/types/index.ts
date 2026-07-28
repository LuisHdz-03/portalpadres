export interface Estudiante {
  idEstudiante: number;
  nombre: string;
  grupo: string;
}

export interface Grupo {
  nombre: string;
  grado: string;
  especialidad: string;
}

export interface Asistencia {
  idAsistencia: number;
  fecha: string;
  estatus: string;
  materia: string;
}

export interface Reporte {
  idReporte: number;
  titulo: string;
  descripcion: string;
  tipoIncidencia: string;
  nivel: string;
  estatus: string;
  fecha: string;
  accionesTomadas: string | null;
  docente: string;
  reportadoPor?: string | null;
}

export interface Acceso {
  idAcceso: number;
  fechaHora: string;
  tipo: string;
}

export interface EstatusData {
  ok: boolean;
  resumen: any;
  asistencias: Asistencia[];
  accesos: Acceso[];
  reportes: Reporte[];
}
