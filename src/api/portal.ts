// src/api/portal.ts
const API_URL = import.meta.env.VITE_API_URL;

// 1. Iniciar sesión
export const loginPadreAPI = async (clave: string) => {
  const response = await fetch(`${API_URL}/padres/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ clave }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error al iniciar sesión");
  }

  return response.json();
};

// 2. Obtener estatus completo (Asistencias, Reportes)
export const getEstatusCompletoAPI = async (
  idEstudiante: number,
  token: string,
) => {
  const response = await fetch(
    `${API_URL}/padres/estatus-completo/${idEstudiante}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Enviamos el token por seguridad
      },
    },
  );

  if (!response.ok)
    throw new Error("Error al obtener el estatus del estudiante");
  return response.json();
};

// 3. Obtener el grupo del alumno (Opcional, ya que el login te lo devuelve, pero aquí está por si lo ocupas)
export const getGrupoAlumnoAPI = async (
  idEstudiante: number,
  token: string,
) => {
  const response = await fetch(`${API_URL}/padres/grupo/${idEstudiante}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Error al obtener el grupo");
  return response.json();
};
