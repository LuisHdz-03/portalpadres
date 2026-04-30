// src/api/portal.ts
const API_URL = import.meta.env.VITE_API_URL;

export const loginPadreAPI = async (clave: string) => {
  const response = await fetch(`${API_URL}/padres/login`, {
    // Ajusta la ruta según tu backend
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
