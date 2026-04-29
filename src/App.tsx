// src/App.tsx
import { useState } from "react";
import "./App.css";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("autenticado");
    window.location.href = "/login";
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>CETIS No. 27 - Portal de Padres</h1>
        <button
          onClick={handleLogout}
          style={{
            background: "transparent",
            color: "white",
            border: "1px solid white",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          Cerrar Sesión
        </button>
      </header>

      <div className="app-content-wrapper">
        <nav className={`app-sidebar ${isCollapsed ? "collapsed" : ""}`}>
          <div className="info-item">
            <strong>👤 Alumno:</strong>
            <p>Cargando datos...</p>
          </div>
          <hr style={{ margin: "15px 0" }} />
          <div className="menu-links">
            <p style={{ margin: "10px 0", cursor: "pointer" }}>
              📊 Calificaciones
            </p>
            <p style={{ margin: "10px 0", cursor: "pointer" }}>
              📅 Asistencias
            </p>
            <p style={{ margin: "10px 0", cursor: "pointer" }}>⚠️ Reportes</p>
          </div>
        </nav>

        <main className="app-main">
          <div className="welcome-card">
            <h2>Bienvenido al Sistema de Seguimiento</h2>
            <p>
              Seleccione una opción del menú lateral para ver el estatus
              académico de su hijo(a).
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
