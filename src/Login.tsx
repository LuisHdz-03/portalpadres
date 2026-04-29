import { useState } from "react";

export default function Login() {
  const [user, setUser] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("autenticado", "1");
    window.location.reload(); // Forzar recarga para que App lea el nuevo estado
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#691c32",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#691c32", marginBottom: "1rem" }}>
          Portal de Padres
        </h2>
        <input
          type="text"
          placeholder="Usuario / CURP"
          style={{ display: "block", margin: "10px auto", padding: "8px" }}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          style={{ display: "block", margin: "10px auto", padding: "8px" }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#691c32",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
