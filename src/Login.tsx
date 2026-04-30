import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "./assets/logoCETIS.png";

export default function Login() {
  const [clave, setClave] = useState(""); // Solo guardamos la clave única
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Validamos únicamente que la clave no esté vacía
    if (clave.trim() !== "") {
      localStorage.setItem("autenticado", "1");

      // Opcional: Puedes guardar la clave por si la necesitas en el Dashboard
      // localStorage.setItem("clave_alumno", clave);

      navigate("/app", { replace: true });
    } else {
      alert("Por favor, ingresa la clave del alumno");
    }
  };

  return (
    <div className="login-bg">
      <form className="login-form" onSubmit={handleLogin}>
        {/* Etiqueta para el logo. Si usas el import de arriba, cambia la ruta estática por {logoCetis} */}
        <img src={logo} alt="Logo Institucional" className="login-logo" />

        <h2>Portal CETIS No. 27</h2>

        <input
          type="text"
          placeholder="Clave única del alumno"
          required
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
