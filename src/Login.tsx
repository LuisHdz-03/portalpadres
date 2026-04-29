import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importamos el hook de navegación

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Inicializamos el hook

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí podrías agregar validaciones reales con tu API
    if (user.trim() !== "" && password.trim() !== "") {
      // Guardamos la bandera de autenticación
      localStorage.setItem("autenticado", "1");

      // Redirigimos a la ruta protegida /app
      // El RouterApp se encargará de dejarte pasar porque ahora "autenticado" es 1
      navigate("/app", { replace: true });
    } else {
      alert("Por favor, ingresa tus credenciales");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#691c32", // Guinda institucional
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          textAlign: "center",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          width: "320px",
        }}
      >
        <h2
          style={{
            color: "#691c32",
            marginBottom: "1.5rem",
            fontSize: "1.5rem",
          }}
        >
          Portal de Padres
        </h2>

        <input
          type="text"
          placeholder="Usuario / CURP"
          required
          style={{
            display: "block",
            margin: "12px auto",
            padding: "10px",
            width: "100%",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          required
          style={{
            display: "block",
            margin: "12px auto",
            padding: "10px",
            width: "100%",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#691c32",
            color: "white",
            border: "none",
            padding: "12px 20px",
            cursor: "pointer",
            borderRadius: "4px",
            width: "100%",
            fontWeight: "bold",
            marginTop: "10px",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#4d1425")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#691c32")
          }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
