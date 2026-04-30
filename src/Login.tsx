import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginPadreAPI } from "./api/portal"; // Importamos la conexión
import "./Login.css";

export default function Login() {
  const [clave, setClave] = useState("");
  const [errorTexto, setErrorTexto] = useState(""); // Para mostrar errores
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorTexto("");

    if (clave.trim() !== "") {
      setCargando(true);
      try {
        // Hacemos la petición al backend real
        const data = await loginPadreAPI(clave.trim());

        // Si sale bien, guardamos el token y los datos del alumno
        localStorage.setItem("autenticado", "1");
        localStorage.setItem("tokenPadre", data.token);
        localStorage.setItem("alumnoData", JSON.stringify(data.alumno));

        navigate("/app", { replace: true });
      } catch (error: any) {
        // Si el backend dice que la clave no existe, mostramos el error
        setErrorTexto(error.message);
      } finally {
        setCargando(false);
      }
    } else {
      setErrorTexto("Por favor, ingresa la clave del alumno");
    }
  };

  return (
    <div className="login-bg">
      <form className="login-form" onSubmit={handleLogin}>
        <img
          src="../src/assets/logoCetis.png"
          alt="Logo Institucional"
          className="login-logo"
        />

        <h2>Portal de Padres</h2>

        {/* Mostramos errores en pantalla si los hay */}
        {errorTexto && (
          <p style={{ color: "red", fontSize: "0.9rem", marginBottom: "10px" }}>
            {errorTexto}
          </p>
        )}

        <input
          type="text"
          placeholder="Clave única del alumno"
          required
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          disabled={cargando}
        />

        <button type="submit" disabled={cargando}>
          {cargando ? "Verificando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
