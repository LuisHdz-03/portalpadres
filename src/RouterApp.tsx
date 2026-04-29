import { type ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./Login";

// Componente para proteger la ruta /app
function RequireAuth({ children }: { children: ReactNode }) {
  const autenticado = localStorage.getItem("autenticado") === "1";

  // Si no está logueado, lo mandamos al login
  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Al entrar a la raíz, mandamos al login por defecto */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 2. Ruta pública del login */}
        <Route path="/login" element={<Login />} />

        {/* 3. Ruta protegida del portal */}
        <Route
          path="/app"
          element={
            <RequireAuth>
              <App />
            </RequireAuth>
          }
        />

        {/* 4. Cualquier otra ruta manda al login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
