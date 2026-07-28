const API_URL = import.meta.env.VITE_API_URL;

// =====================================
// LOGIN PADRE
// =====================================

export const loginPadreAPI = async (clave: string) => {
  const response = await fetch(`${API_URL}/padres/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      clave,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.error || "Error al iniciar sesión");
  }

  return response.json();
};

// =====================================
// RESUMEN DEL ESTUDIANTE
// =====================================

export const getResumenAlumnoAPI = async (
  idEstudiante: number,
  token: string,
) => {
  const response = await fetch(`${API_URL}/padres/estatus/${idEstudiante}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener resumen del estudiante");
  }

  return response.json();
};

// =====================================
// ACCESOS PAGINADOS
// =====================================

export const getAccesosAlumnoAPI = async (
  idEstudiante: number,
  token: string,
  pagina = 1,
  limite = 10,
) => {
  const response = await fetch(
    `${API_URL}/padres/accesos/${idEstudiante}?pagina=${pagina}&limite=${limite}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Error al obtener accesos");
  }

  return response.json();
};

// =====================================
// ASISTENCIAS
// =====================================

export const getAsistenciasAlumnoAPI = async (
  idEstudiante: number,
  token: string,
) => {
  const response = await fetch(
    `${API_URL}/padres/asistencias/${idEstudiante}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Error al obtener asistencias");
  }

  return response.json();
};

// =====================================
// REPORTES
// =====================================

export const getReportesAlumnoAPI = async (
  idEstudiante: number,
  token: string,
) => {
  const response = await fetch(`${API_URL}/padres/reportes/${idEstudiante}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener reportes");
  }

  return response.json();
};

// =====================================
// GRUPO DEL ALUMNO
// =====================================

export const getGrupoAlumnoAPI = async (
  idEstudiante: number,
  token: string,
) => {
  const response = await fetch(`${API_URL}/padres/grupo/${idEstudiante}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener grupo");
  }

  return response.json();
};
